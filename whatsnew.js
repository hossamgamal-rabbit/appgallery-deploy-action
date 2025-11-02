import * as fs from "fs";
import { readFile } from 'fs/promises';
import * as path from "path";

export async function readLocalizedReleaseNotes(whatsNewDir) {
    
    if (whatsNewDir != undefined && whatsNewDir.length > 0) {
        const releaseNotes = fs.readdirSync(whatsNewDir)
            .filter(value => /whatsnew-((.*-.*)|(.*))\b/.test(value));
        const pattern = /whatsnew-(?<local>(.*-.*)|(.*))/;

        const localizedReleaseNotes = [];

        for (const value of releaseNotes) {
            const matches = value.match(pattern);
            if (matches != null && matches.length == 4) {
                const lang = matches[1];
                const filePath = path.join(whatsNewDir, value);
                const content = await readFile(filePath, 'utf-8');

                if (content != undefined) {
                    localizedReleaseNotes.push(
                        {
                            language: lang,
                            text: content
                        }
                    )
                }
            }
        }

        return localizedReleaseNotes
    }
    return []
}