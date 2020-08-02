<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children'}"
    >
      <el-table-column prop="id" label="分类编号" width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <del-btn type="danger" @confirm="del(scope.row.id)">删除</del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {  requestCateDelete } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "cate/requestList",
    }),
      //点击了编辑按钮

      edit(id) {
        this.$emit("edit", id);
      },
      //点击了删除按钮
      del(id) {
        console.log("33333333333333333333");
        requestCateDelete({id:id}).then(res=>{
          if(res.data.code==200){
            successAlert("删除成功")
            //再次获取列表数据
            this.requestList()
          }else{
            warningAlert(res.data.msg)
          }
        })
      },                                                                                                         
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>