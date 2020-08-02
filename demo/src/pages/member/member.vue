<template>
  <div class="ppp">
    
    <!-- 添加弹窗 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./component/add";
import vList from "./component/list";
export default {
  components: { vAdd, vList },
  data() {
    return {
      info: {
        show: false,
        title: "会员修改",
      },
    };
  },
  methods: {
    //点击了编辑
    edit(id) {
      this.info.show = true;
      this.info.title = "会员修改";
      this.$refs.add.getDetail(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
.menu_add {
  margin-bottom: 20px;
}
</style>