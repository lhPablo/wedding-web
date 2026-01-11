import { readdir, unlink } from 'fs/promises';
import { join } from 'path';

const DIST_ASTRO = './dist/_astro';
const EXTENSIONS_TO_REMOVE = ['.png', '.jpg', '.jpeg'];

async function cleanDist() {
  try {
    const files = await readdir(DIST_ASTRO);
    const filesToRemove = files.filter(f => 
      EXTENSIONS_TO_REMOVE.some(ext => f.toLowerCase().endsWith(ext))
    );
    
    for (const file of filesToRemove) {
      await unlink(join(DIST_ASTRO, file));
      console.log(`Removed: ${file}`);
    }
    
    if (filesToRemove.length > 0) {
      console.log(`✅ ${filesToRemove.length} file(s) removed from build`);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.error('Error cleaning dist:', error);
    }
  }
}

cleanDist();

