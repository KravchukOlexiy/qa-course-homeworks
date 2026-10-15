import { test, expect } from '@playwright/test'

test('Send form with different data should be successful', async ({ page }) => {

    const data = {
        name: 'test',
        email: 'test@gm.com',
        theme: 'feature',
        priority: 'contact-priority-high',
        message: 'Message',
        attachment: 'png.png',
        isCopyNeeded: true,
        expectedPositive: async function () {
            await expect(page.getByTestId('contact-success').getByRole('paragraph')).toContainText(`Ваше звернення надіслано. Ми відповімо на ${formDatas[0].email}.`)
        },
        expectedNegative: async function () {
            await expect(page.getByTestId('error-messages')).toContainText('name обов\'язкове поле');
            await expect(page.getByTestId('error-messages')).toContainText('email некоректний email');
            await expect(page.getByTestId('error-messages')).toContainText('message обов\'язкове поле');
        }
    }


    const formDatas = [
        {
            name: data.name,
            email: data.email,
            theme: data.theme,
            priority: data.priority,
            message: data.message,
            attachment: data.attachment,
            isCopyNeeded: data.isCopyNeeded,
            expected: data.expectedPositive
        },
        {
            name: data.name,
            email: data.email,
            message: data.message,
            expected: data.expectedPositive
        },
        {
            theme: data.theme,
            priority: data.priority,
            attachment: data.attachment,
            isCopyNeeded: data.isCopyNeeded,
            expected: data.expectedNegative
        }];

    for (const formData of formDatas) {
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
        await formData.expected()
    }
})