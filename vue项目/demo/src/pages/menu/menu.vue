<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="menu_add" @click="add">添加</el-button>
    <!-- 添加弹窗 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 列表详情 -->
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //给子组件add传递的信息,json格式改变会传递过来
      info: {
        //弹框的状态
        show: false,
        // 弹框的题目
        title: "菜单添加",
        isAdd:true
      },
    };
  },
  methods: {
    //添加弹框,点击添加的时候弹框显示为true
    add() {
      this.info.show = true;
      this.info.title="菜单添加";
      this.info.isAdd=true;
    },
    //点击了编辑
    edit(id) {
      this.info.title="编辑菜单";
      this.info.isAdd=false;
      this.info.show = true;
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