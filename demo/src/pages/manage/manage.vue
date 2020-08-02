<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="menu_add" @click="add">添加</el-button>
    <!-- 列表 -->
    <v-list @edit="edit($event)"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" ref="add"></v-add>
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
        title: "用户添加",
        isAdd: true,
      },
    };
  },
  methods: {
    add() {
      this.info.show = true;
      this.info.title = "用户添加";
      this.info.isAdd = true;
    },
    //点击了编辑
    edit(id) {
      this.info.show = true;
      this.info.title = "用户编辑";
      this.info.isAdd = false;
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