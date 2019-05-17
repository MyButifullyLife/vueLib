import { vue } from 'vue2-app-libs';

let constructor = () => {
    const loadingConstructor = vue.extend(require('./loading.vue'));
    let instances = {
        init: ({el = document.body, color = '#1ab394', size = '20px', text, spinner = true} = {})=>{
            let instance = new loadingConstructor().$mount();
            let loading = document.getElementById('loadingImg');
            if(loading) {
                loading.parentNode.removeChild(loading);
            };
            el.style.position = el.style.position || el !== document.body ? 'relative': 'none';
            el.appendChild(instance.$el);
            // console.log(instance._props)
            instance._props.isFullScreen = el === document.body;
            instance._props.color = color;
            instance._props.size = size;
            instance._props.text = text;
            instance._props.spinner = spinner;
            instance['show'] = () => {
                instance.isShow = true;
            };
            instance['hide'] = () => {
                instance.isShow = false;
            };
            return instance;
        }
    }

    // instance['init'] = ({el = document.body, color = '#1ab394', size = '18px'} = {}) => {
    //     el.style.position = el.style.position || el !== document.body ? 'relative': 'none';
    //     el.appendChild(instance.$el);
    //     instance.color = color;
    //     instance.size = size;
    // };
    //
    // instance['show'] = () => {
    //     instance.isShow = true;
    // };
    //
    // instance['hide'] = () => {
    //     instance.isShow = false;
    // };

    return instances;
};

export default constructor;

