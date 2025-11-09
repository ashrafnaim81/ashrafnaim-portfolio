import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Convert plain text blog content to HTML format
 * This script migrates existing blog posts to use rich text HTML format
 */

function convertTextToHTML(text: string): string {
  if (!text) return '';

  let html = text;

  // Split by double newlines to detect paragraphs
  const paragraphs = html.split(/\n\n+/);

  const processedParagraphs = paragraphs.map((para) => {
    para = para.trim();
    if (!para) return '';

    // Detect headings (lines starting with # or all caps)
    if (para.startsWith('# ')) {
      return `<h1>${para.substring(2).trim()}</h1>`;
    }
    if (para.startsWith('## ')) {
      return `<h2>${para.substring(3).trim()}</h2>`;
    }
    if (para.startsWith('### ')) {
      return `<h3>${para.substring(4).trim()}</h3>`;
    }

    // Detect code blocks (lines with multiple backticks or indentation)
    if (para.startsWith('```')) {
      const codeContent = para.replace(/```(\w*)\n?/g, '').replace(/```$/, '');
      return `<pre><code>${escapeHtml(codeContent)}</code></pre>`;
    }

    // Detect unordered lists (lines starting with - or *)
    const listMatch = para.match(/^[\-\*]\s/m);
    if (listMatch) {
      const items = para
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => {
          const content = line.replace(/^[\-\*]\s+/, '').trim();
          return `<li>${processInlineFormatting(content)}</li>`;
        })
        .join('');
      return `<ul>${items}</ul>`;
    }

    // Detect ordered lists (lines starting with numbers)
    const orderedListMatch = para.match(/^\d+\.\s/m);
    if (orderedListMatch) {
      const items = para
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => {
          const content = line.replace(/^\d+\.\s+/, '').trim();
          return `<li>${processInlineFormatting(content)}</li>`;
        })
        .join('');
      return `<ol>${items}</ol>`;
    }

    // Detect blockquotes (lines starting with >)
    if (para.startsWith('>')) {
      const quoteContent = para.replace(/^>\s*/gm, '').trim();
      return `<blockquote><p>${processInlineFormatting(quoteContent)}</p></blockquote>`;
    }

    // Regular paragraph
    // Handle single newlines within paragraph as <br>
    const content = para.replace(/\n/g, '<br>');
    return `<p>${processInlineFormatting(content)}</p>`;
  });

  return processedParagraphs.filter((p) => p).join('\n');
}

function processInlineFormatting(text: string): string {
  let processed = text;

  // Bold: **text** or __text__
  processed = processed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  processed = processed.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic: *text* or _text_
  processed = processed.replace(/\*(.+?)\*/g, '<em>$1</em>');
  processed = processed.replace(/_(.+?)_/g, '<em>$1</em>');

  // Inline code: `code`
  processed = processed.replace(/`(.+?)`/g, '<code>$1</code>');

  // Links: [text](url)
  processed = processed.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');

  return processed;
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

async function migrateBlogPosts() {
  console.log('🔄 Starting blog post migration to HTML format...\n');

  try {
    // Fetch all blog posts
    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'asc' },
    });

    console.log(`📊 Found ${posts.length} blog posts to migrate\n`);

    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const post of posts) {
      try {
        // Check if content already looks like HTML
        if (post.content.includes('<p>') || post.content.includes('<h1>')) {
          console.log(`⏭️  Skipping "${post.title}" - already in HTML format`);
          skipCount++;
          continue;
        }

        console.log(`🔄 Converting "${post.title}"...`);

        // Convert plain text to HTML
        const htmlContent = convertTextToHTML(post.content);

        // Update database
        await prisma.blogPost.update({
          where: { id: post.id },
          data: { content: htmlContent },
        });

        console.log(`✅ Successfully converted "${post.title}"\n`);
        successCount++;
      } catch (error) {
        console.error(`❌ Error converting "${post.title}":`, error);
        errorCount++;
      }
    }

    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 Migration Summary:');
    console.log(`✅ Successfully converted: ${successCount}`);
    console.log(`⏭️  Skipped (already HTML): ${skipCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`📊 Total processed: ${posts.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (successCount > 0) {
      console.log('✨ Migration completed successfully!');
      console.log('🎯 You can now use the rich text editor to edit these posts.\n');
    }
  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateBlogPosts()
  .then(() => {
    console.log('👋 Migration script finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  });
