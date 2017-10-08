import * as Path from 'path';
import { writeFileSync, readFileSync } from 'fs';
import { bgYellow, green } from 'chalk';

const log = console.log;
const filename = Path.basename(__filename);
const iconsJSONFile = readFileSync('./icons.json');
const languagesJSONFile = readFileSync('./languages.json');

type IconKey = string;

const icons = JSON.parse(iconsJSONFile.toString()) as {
    iconDefinitions: { [iconKey: string]: { iconPath: string } },
    folderNames: { [folderName: string]: IconKey },
    fileExtensions: { [fileExtension: string]: IconKey },
    fileNames: { [fileName: string]: IconKey },
    languageIds: { [language: string]: IconKey }
};

const langauges = JSON.parse(languagesJSONFile.toString()) as {
    [language: string]: {
        ids: string | string[];
        defaultExtension: string;
    }
};

// create mini-json files

(async function () {
    log(bgYellow(`(${filename}) Creating mini-json files from definitions`));
    // ICON DEFINITIONS
    const iconsDefinition = Object.keys(icons.iconDefinitions).reduce((acc, icon) => ({
        ...acc,
        [icon]: icons.iconDefinitions[icon].iconPath.split('/').pop()
    }), {});

    writeFileSync(
        './src/json/iconDefinitions.json',
        JSON.stringify(iconsDefinition, null, 2)
    );
    log(green(`> 'iconDefinitions.json' file created`));

    // FOLDER NAMES
    const folderNames = Object.keys(icons.folderNames).reduce((acc, folderName) => ({
        ...acc,
        [folderName]: icons.folderNames[folderName]
    }), {});
    writeFileSync(
        './src/json/folderNames.json',
        JSON.stringify(folderNames, null, 2)
    );
    log(green(`> 'folderNames1.json' file created`));

    // FILE EXTENSIONS
    const fileExtensions = Object.keys(icons.fileExtensions).reduce((acc, fileExtension) => ({
        ...acc,
        [fileExtension]: icons.fileExtensions[fileExtension]
    }), {});
    writeFileSync(
        './src/json/fileExtensions.json',
        JSON.stringify(fileExtensions, null, 2)
    );
    log(green(`> 'fileExtensions.json' file created`));

    // FILE NAMES
    const fileNames = Object.keys(icons.fileNames).reduce((acc, fileName) => ({
        ...acc,
        [fileName]: icons.fileNames[fileName]
    }), {});
    writeFileSync(
        './src/json/fileNames.json',
        JSON.stringify(fileNames, null, 2)
    );
    log(green(`> 'fileNames.json' file created`));

    // LANGUAGES IDS
    const languagesIds = Object.keys(langauges).reduce((acc, languageId) => {
        const language = langauges[languageId];
        const langaugeIcon = {
            [language.defaultExtension]: icons.languageIds[languageId]
        };
        return {
            ...acc,
            ...langaugeIcon
        };
    }, {});
    writeFileSync(
        './src/json/languagesIds.json',
        JSON.stringify(languagesIds, null, 2)
    );
    log(green(`> 'languagesIds.json' file created`));

})();