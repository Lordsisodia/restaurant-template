/**
 * Gallery Photos API
 *
 * POST   - Create gallery photo (with Cloudinary image)
 * GET    - List gallery photos for a client
 * DELETE - Delete gallery photo
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const {
      client_id,
      cloudinary_public_id,
      image_url,
      title,
      caption,
      tags,
    } = body;

    if (!client_id || !cloudinary_public_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('gallery_photos')
      .insert({
        client_id,
        cloudinary_public_id,
        image_url,
        title,
        caption,
        tags: tags || [],
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to create gallery photo' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json(
        { error: 'Missing clientId' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('gallery_photos')
      .select('*')
      .eq('client_id', clientId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch gallery photos' },
        { status: 500 }
      );
    }

    return NextResponse.json({ photos: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json(
        { error: 'Missing publicId' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('gallery_photos')
      .delete()
      .eq('cloudinary_public_id', publicId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete gallery photo' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
