<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <!-- ----------规格编号------------ -->
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <!-- ----------规格名称------------ -->
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <!-- ----------规格属性------------ -->
      <el-table-column label="规格名称" width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>
      <!-- ----------状态------------ -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- ----------操作------------ -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn type="danger" @confirm="del(scope.row.id)">删除</del-btn>
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
import { successAlert, warningAlert } from "../../../util/alert";
import { requestSpecDelete } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      //同时取出total和zize
      total: "spec/total",
      size: "spec/size",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      //------------修改页面-------------
      requestTotal: "spec/requestTotal",
      changePage: "spec/changePage",
    }),
    //----------------修改页码--------------
    cPage(a) {
      // console.log(a);
      this.changePage(a);
      this.requestList();
    },

    //-------------点击了编辑按钮--------------
    edit(id) {
      this.$emit("edit", id);
    },
    //--------------点击了删除按钮-----------------
    del(id) {
      requestSpecDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          //再次获取列表数据
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
    //--------进入请求列表和总条数----------
    this.requestTotal();
    this.requestList();
  },
};
</script>
<style scoped>
</style>