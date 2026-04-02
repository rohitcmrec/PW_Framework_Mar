import { tr } from '@faker-js/faker';
import { parse } from 'csv-parse'
import fs from 'fs'

export class DataProvider {

    static getDataFromJson(filePath: string) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    static getDataFromCSV(filePath: string) {
        return parse(fs.readFileSync(filePath), { columns: true, skip_empty_lines: true })
    }
}