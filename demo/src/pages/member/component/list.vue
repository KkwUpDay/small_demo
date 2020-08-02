<template>
  <div>
    <el-table :data="list" style="width: 100%;margin-bottom: 20px;" row-key="id" border>
      <el-table-column prop="uid" label="会员编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>

      <!-- -----------状态-------- -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!------------ 操作 ------------>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  computed: {
    ...mapGetters({
      list: "member/list",
    }),
  },
  components: {},
  data() {
    return {
    };
  },
  methods: {
    ...mapActions({
      requestList: "member/requestList",
    }),
    //点击了编辑按钮

    edit(id) {
      this.$emit("edit", id);
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