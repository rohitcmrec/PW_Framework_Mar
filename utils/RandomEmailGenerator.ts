import { fa, faker } from '@faker-js/faker'

export class RandomEmailGenerator {

    getFirstName() {
        return faker.person.firstName();
    }

    getLastName() {
        return faker.person.lastName();
    }

    getFullName() {
        return faker.person.fullName();
    }

    getPhone() {
        return faker.phone.number();
    }

    getRandomEmail(): string {
        const randomValue = Math.random().toString(36).substring(2, 9);
        return `auto_${randomValue}@nal.com`;
    }
}