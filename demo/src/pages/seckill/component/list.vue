<template>
  <div>
    <el-table :data="list" border style="width: 100%" >
      <!------------- 活动名称 --------------->
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <!------------- 状态 --------------->
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <!------------- 操作 --------------->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编 辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requestSeckillDelete } from "../../../util/request";
//引入弹框
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      requestList: "seckill/requestList",
    }),
    //修改
    edit(id) {
      // console.log(a);
      this.$emit("edit", id); //子传父,
    },

    //删除
    del(id) {
      requestSeckillDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.requestList();
  },
};
</script>
<style scoped>
</style>