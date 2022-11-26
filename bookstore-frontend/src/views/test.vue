<script>
import { useUserStore } from "../stores/UserStore";
export default{
    data() {
        return{
            userStore: useUserStore()
        }
    },
    methods: {
        t(){
            // this.userStore.setNameUser("Trần Văn Sáng");
        }
    },
    mounted(){
        this.t()
    }
}
</script>

<template>
    {{userStore}}
</template>