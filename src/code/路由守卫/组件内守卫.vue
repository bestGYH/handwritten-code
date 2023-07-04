<template>
  <div>
    测试组件内守卫
  </div>
</template>
<script>
export default {
  data() {
    return {
        name:'这是一个组件'
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log("thisInBeforeRouteEnterNext", this); // undefined
      console.log("vm", vm);
      console.log("dataDataInBeforeRouteEnter  ", vm.name);
      console.log(vm.getName());
    });
  },
  beforeRouteLeave(to, from, next) {
    // 离开时
    console.log("beforeRouteEnter");
    console.log("thisInBeforeRouteEnter", this);
    next((vm) => {
      console.log("thisInBeforeRouteEnterNext", this);
      console.log("vm", vm);
      console.log("dataDataInBeforeRouteEnter  ", vm.name);
      console.log(vm.getName());
    });
  },
  mounted(){
  },
  methods:{
    getName(){
      return `组件名字${this.name}`
    }
  },
}
</script>
<style scoped>

</style>
