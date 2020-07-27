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
  components: {
    vAdd,
    vList,
  },
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
      this.info.isAdd = true;
      this.info.title = "商品添加";
    },
    edit(id) {
      this.info.show = true;
      this.info.show = false;
      this.info.title = "商品修改";
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