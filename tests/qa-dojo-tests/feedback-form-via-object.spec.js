import { test, expect } from '@playwright/test'

const data = {
    name: 'test',
    email: 'test@gm.com',
    theme: 'feature',
    priority: 'contact-priority-high',
    message: 'Message',
    attachment: 'png.png',
    isCopyNeeded: true
}

async function expectSuccess(page, formData) {
    await expect(page.getByTestId('contact-success').getByRole('paragraph')).toContainText(`Ваше звернення надіслано. Ми відповімо на ${formData.email}.`)
}

async function expectValidationErrors(page) {
    await expect(page.getByTestId('error-messages')).toContainText('name обов\'язкове поле');
    await expect(page.getByTestId('error-messages')).toContainText('email некоректний email');
    await expect(page.getByTestId('error-messages')).toContainText('message обов\'язкове поле');
}

const formDatas = [
    {
        title: 'all fields filled',
        name: data.name,
        email: data.email,
        theme: data.theme,
        priority: data.priority,
        message: data.message,
        attachment: data.attachment,
        isCopyNeeded: data.isCopyNeeded,
        expected: expectSuccess
    },
    {
        title: 'only required fields filled',
        name: data.name,
        email: data.email,
        message: data.message,
        expected: expectSuccess
    },
    {
        title: 'required fields are empty',
        theme: data.theme,
        priority: data.priority,
        attachment: data.attachment,
        isCopyNeeded: data.isCopyNeeded,
        expected: expectValidationErrors
    }];

for (const formData of formDatas) {
    test(`Send feedback form: ${formData.title}`, async ({ page }) => {
        await page.goto('/articles/contact');

        if (formData.name !== undefined) {
            await page.getByTestId('contact-name').fill(formData.name);
        }

        if (formData.email !== undefined) {
            await page.getByTestId('contact-email').fill(formData.email);
        }

        if (formData.theme !== undefined) {
            await page.getByTestId('contact-subject').selectOption(formData.theme);
        }

        if (formData.priority !== undefined) {
            await page.getByTestId(formData.priority).check();
        }

        if (formData.message !== undefined) {
            await page.getByTestId('contact-message').fill(formData.message);
        }

        if (formData.attachment !== undefined) {
            await page.getByTestId('contact-attachments').setInputFiles(formData.attachment);
        }

        if (formData.isCopyNeeded) {
            await page.getByTestId('contact-copy-me').check();
        }

        await page.getByTestId('contact-submit').click();
        await formData.expected(page, formData);
    })
}
