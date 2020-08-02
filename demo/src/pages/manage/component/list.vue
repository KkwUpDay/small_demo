<template>
  <div>
    <!-- 页面展示 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="cPage"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestManageDelete,
  requestManageUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      //   取出total和size
      total: "manage/total",
      size: "manage/size",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "manage/requestList",
      requestTotal: "manage/requestTotal",
      changePage: "manage/changePage",
    }),
    //修改页码
    cPage(a) {
      // console.log(a); 
      this.changePage(a);
      this.requestList();
    },
    //编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      console.log(id);
      requestManageDelete({uid:id}).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          //重新获取列表页面
          this.requestList();
          //重新获取总数
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //进入请求列表和总条数
    this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>
</style>