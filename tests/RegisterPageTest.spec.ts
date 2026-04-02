import { test, expect } from '@playwright/test'
import { RegisterPage } from '../pages/RegisterPage'
import { TestConfig } from '../test.config'
import { HomePage } from '../pages/HomePage'
import { RandomEmailGenerator } from '../utils/RandomEmailGenerator'
import { DataProvider } from '../utils/DataProvider'


let homePage: HomePage;
let registerPage: RegisterPage;
let randomEmailGenerator: RandomEmailGenerator;

test.beforeEach('', async ({ page }) => {
    let url = new TestConfig().appUrl
    homePage = new HomePage(page);
    await page.goto(url); // navigate to url
})

test.afterEach('', async ({ page }) => {
    await page.close();
})
test('Userregistration page via faker library', { tag: ['@sanity', '@master'] }, async () => {

    await homePage.clickMyAccount();
    registerPage = await homePage.clickRegister();
    randomEmailGenerator = new RandomEmailGenerator();

    let flag = await registerPage.performRegistration
        (randomEmailGenerator.getFirstName(),
            randomEmailGenerator.getLastName(),
            randomEmailGenerator.getRandomEmail(),
            randomEmailGenerator.getPhone(),
            "1233",
            "Yes",)
    expect(flag).toContain('Your Account Has Been Created');
})

const jsonPath = "testdata/data.json"
const jsonData: any = DataProvider.getDataFromJson(jsonPath);
for (let data of jsonData) {

    test(`Userregistration page via data provider for ${data.firstName} `, { tag: ['@sanity', '@data'] }, async () => {

        await homePage.clickMyAccount();
        registerPage = await homePage.clickRegister();
        randomEmailGenerator = new RandomEmailGenerator();

        let flag = await registerPage.performRegistration
            (data.firstName,
                data.lastName,
                randomEmailGenerator.getRandomEmail(),
                data.telephone,
                data.password,
                data.subs,)
        expect(flag).toContain('Your Account Has Been Created');
    })
}
