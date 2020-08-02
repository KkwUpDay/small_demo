<template>
  <div>
    <el-table
      :data="list"
      border
      row-key="id"
      style="width: 100%"
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="菜单编号" width="80" :span="2"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- <el-button type="primary">添加</el-button> -->
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestMenuDelete } from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "menu/requestList",
    }),
    //点击编辑,显示弹框
    edit(id) {
      this.$emit("edit", id); //通知父组件点击了edit按钮,然后menu接受下
    },
    //点击删除按钮删除当前行
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起一个删除请求
          requestMenuDelete({ id: id }).then((res) => {
            console.log(id);
            //删除的收尾工作
            if (res.data.code == 200) {
              // 发起删除成功弹框
              successAlert("删除成功");
              // 再次请求列表数据
              this.requestList();
            }else{
              warningAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    //进入页面就请求数据,页面展示
    this.requestList();
  },
};
</script>
<style scoped>
</style>