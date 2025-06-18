/* global global, describe, it, expect*/
import { mount } from '@vue/test-utils';
import UserList from '@/views/UserList.vue';
import { vi } from 'vitest';
import flushPromises from 'flush-promises';

describe('UserList.vue', () => {
    it('render a list of users after successfull API request', async () => {

        // Mock API data
        const mockUsers = [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
        ];

        // Mock the fetch function
        global.fetch = vi.fn(() => {
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUsers),
            })
        })

        const wrapper = mount(UserList);

        // wait all promise done & update DOM
        await flushPromises();

        const users = wrapper.findAllComponents({ name: 'UserCard' })

        expect(users.length).toBe(2)
        expect(users[0].props('user')).toEqual({ id: 1, name: 'John Doe' })
        expect(users[1].props('user')).toEqual({ id: 2, name: 'Jane Smith' })
    })
})