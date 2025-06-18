/* global global, describe, it, expect*/
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import flushPromises from 'flush-promises';
import UserForm from '@/views/UserForm.vue';

describe('UserForm.vue', () => {
    it('submits the form and emits submit event when valid data entered', async () => {
        const wrapper = mount(UserForm);

        const name = "bambang"
        const username = "fufufefe"
        const email = "bambang123@mail.com"

        // Simulation form input
        await wrapper.find('input#name').setValue(name)
        await wrapper.find('input#username').setValue(username)
        await wrapper.find('input#email').setValue(email)

        // Mock the post function
        global.fetch = vi.fn(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    name,
                    username,
                    email
                }),
            })
        })

        // Simulation click submit button
        await wrapper.find('form').trigger('submit')
        // make sure event submit only emitted once
        expect(wrapper.emitted().submit).toHaveLength(1)

        // wait all promise done & update DOM
        await flushPromises();

        // make sure event submit already emitted
        expect(wrapper.emitted()).toHaveProperty('submit')
        expect(wrapper.text()).toContain(`Succeed add new user ${username}`)
    })
})