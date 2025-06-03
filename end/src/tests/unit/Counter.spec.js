/* global describe, it, expect, beforeEach */
import { mount } from '@vue/test-utils';
import CounterPage from '@/views/CounterPage.vue';
import { createPinia, setActivePinia } from 'pinia';

describe('CounterPage', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        setActivePinia(createPinia())
    })

    it('renders the component', () => {
        const wrapper = mount(CounterPage);
        expect(wrapper.exists()).toBe(true);
    });

    it('increments the counter when button is clicked', async () => {
        const wrapper = mount(CounterPage);
        const button = wrapper.find('button#increment');

        await button.trigger('click');

        console.log(wrapper.text());
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
            propsData: {
                message: 'hello world'
            }
        });

        // console.log(wrapper.props('message'));
        expect(wrapper.props('message')).toBe('hello world')
    });
});