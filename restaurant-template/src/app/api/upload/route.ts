/**
 * Cloudinary Upload API Route
 *
 * POST /api/upload - Upload image to client folder
 * DELETE /api/upload - Delete image
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, deleteFromCloudinary, listClientImages } from '@/lib/integrations/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const clientId = formData.get('clientId') as string;
    const category = formData.get('category') as string | undefined;
    const subcategory = formData.get('subcategory') as string | undefined;

    if (!file || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(file, {
      clientId,
      category: category as any,
      subcategory,
    });

    // TODO: Save to database
    // await supabase.from('images').insert({
    //   client_id: clientId,
    //   cloudinary_public_id: result.publicId,
    //   category,
    //   subcategory,
    // });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { publicId } = await request.json();

    if (!publicId) {
      return NextResponse.json(
        { error: 'Missing publicId' },
        { status: 400 }
      );
    }

    await deleteFromCloudinary(publicId);

    // TODO: Delete from database
    // await supabase.from('images').delete().eq('cloudinary_public_id', publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('clientId');
    const category = searchParams.get('category') || undefined;
    const subcategory = searchParams.get('subcategory') || undefined;

    if (!clientId) {
      return NextResponse.json(
        { error: 'Missing clientId' },
        { status: 400 }
      );
    }

    const images = await listClientImages(clientId, category as any, subcategory);

    return NextResponse.json({ images });
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json(
      { error: 'Failed to list images' },
      { status: 500 }
    );
  }
}
