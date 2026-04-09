import { test as base, expect } from '@playwright/test'
import { MyAccount } from '../pages/MyAccount';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

let config: TestConfig = new TestConfig();

type MyFixture = {
    myAccount: MyAccount
}

const test = base.extend<MyFixture>({
    myAccount: async () => {

    }
})

export { expect };

