import { mount } from '@vue/test-utils';
import CounterPage from '@/views/CounterPage.vue';
import { describe, expect, it } from 'vitest';

describe('CounterPage', () => {
    it('renders the component', () => {
        const wrapper = mount(CounterPage);
        expect(wrapper.exists()).toBe(true);
    });

    it('increments the counter when button is clicked', async () => {
        const wrapper = mount(CounterPage);
        const button = wrapper.find('button#increment');

        await button.trigger('click');

        // console.log(wrapper.text());
        // console.log(wrapper.html());
        expect(wrapper.text()).toContain('Count : 1');
    });

    it('decrements the counter when button is clicked', async () => {
        const wrapper = mount(CounterPage);
        const button = wrapper.find('button#decrement')

        await button.trigger('click');
        expect(wrapper.text()).toContain('Count : -1');
    });

    it('renders the correct message from prop', () => {
        const wrapper = mount(CounterPage, {
            props: {
                message: 'hello world'
            }
        });

        expect(wrapper.text()).toContain('message : hello world');
    });
});