#!/usr/bin/env node

/**
 * LangFuse Phase Tracking Helper
 *
 * Use this during planning to track each phase completion.
 *
 * Usage:
 *   node tools/langfuse-track-phase.js <phase> <duration> <tokens> <cost> <score>
 *
 * Example:
 *   node tools/langfuse-track-phase.js 1 "12 minutes" 18500 0.47 95
 */

import { Langfuse } from "langfuse";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Parse arguments
const phaseNum = process.argv[2];
const duration = process.argv[3] || 'unknown';
const tokens = parseInt(process.argv[4]) || 0;
const cost = parseFloat(process.argv[5]) || 0;
const score = parseInt(process.argv[6]) || 0;

if (!phaseNum) {
  console.error('❌ Error: Phase number required');
  console.error('Usage: node tools/langfuse-track-phase.js <phase> <duration> <tokens> <cost> <score>');
  console.error('Example: node tools/langfuse-track-phase.js 1 "12 minutes" 18500 0.47 95');
  process.exit(1);
}

// Load trace info
const traceInfoPath = path.join(__dirname, '../.langfuse-trace.json');
if (!fs.existsSync(traceInfoPath)) {
  console.error('❌ Error: No active trace. Run: node tools/langfuse-init.js first');
  process.exit(1);
}

const traceInfo = JSON.parse(fs.readFileSync(traceInfoPath, 'utf-8'));

// Phase names
const phaseNames = {
  '1': 'Industry Research',
  '2': 'Competitor Analysis',
  '3': 'Feature Planning',
  '4': 'Architecture Design',
  '4.5': 'UI/UX Design',
  '5': 'Component Mapping',
  '6': 'Domain Operations',
  '7': 'Database Schema',
  '8': 'Build Plan',
  '9': 'PDR Creation',
};

const phaseName = phaseNames[phaseNum] || `Phase ${phaseNum}`;

console.log(`\n📊 Tracking Phase ${phaseNum}: ${phaseName}...\n`);

// Initialize LangFuse
const langfuse = new Langfuse({
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

// Get trace
const trace = langfuse.trace({ id: traceInfo.traceId });

// Create span for this phase
const phaseSpan = trace.span({
  name: `Phase ${phaseNum}: ${phaseName}`,
  input: {
    phase: phaseNum,
    phaseName,
  },
  metadata: {
    startTime: new Date().toISOString(),
  },
});

// End span immediately with provided metrics
phaseSpan.end({
  output: {
    status: 'completed',
    filesCreated: `See docs/ for Phase ${phaseNum} deliverables`,
  },
  metadata: {
    duration,
    tokensUsed: tokens,
    estimatedCost: cost,
    verificationScore: score,
    passed: score >= 80 || (phaseNum === '4.5' && score >= 85) || (phaseNum === '9' && score >= 90),
  },
  level: score >= 80 ? 'DEFAULT' : 'WARNING',
});

console.log('✅ Phase tracked successfully!\n');
console.log('   Duration:', duration);
console.log('   Tokens:', tokens.toLocaleString());
console.log('   Cost: $' + cost.toFixed(2));
console.log('   Verification Score:', score + '%');
console.log('');

// Flush
setTimeout(async () => {
  await langfuse.shutdownAsync();
  console.log('📤 Data sent to LangFuse\n');
  console.log(`View at: ${process.env.LANGFUSE_HOST}/traces/${traceInfo.traceId}\n`);
}, 2000);
