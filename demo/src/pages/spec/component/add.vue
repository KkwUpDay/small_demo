<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <!-- =-=============规格名称 ==================-->
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="form.specsname" ></el-input>
        </el-form-item>
        <!-- ----------------规格属性 ------------------->
        <!----------循环列出,长度为0則删除不显示 ---------->
        <el-form-item v-for="(item,index) in attrArr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
        </el-form-item>
        <!--================= 状态===================-->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate,
} from "../../../util/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  components: {},
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      //form后端的需求
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      //拿到页面的方法
      requestTotal: "spec/requestTotal",
    }),
    //-------------------添加新属性-----------------
    // ---------------新增/删除规格属性-------------
    //新增规格属性
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    // --------------重置和取消弹框---------------
    //重置
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      //将数组也给清除
      this.attrArr = [
        {
          value: "",
        },
      ];
    },
    //取消添加/修改
    cancel() {
      this.info.show = false;
      //如果不是添加就置空一下
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    //---------------添加到list--------------------
    add() {
      //判断输入栏,输入不能为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("输入值不能为空");
        return;
      }

      // 后段需要的是字符串,转换格式
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      //发起请求
      requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //重置form数据
          this.empty();
          //弹框消失
          this.cancel();
          //再次请求list数据
          this.requestList();
          //重新获取总的数量
          this.requestTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //------------获取其中某一条数据----------------
    getDetail(id) {
      //ajax
      requestSpecDetail({ id: id }).then((res) => {
        console.log(res.data.list);
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },

    // ------------------修改Spec------------------
    update() {
      //判断输入栏,输入不能为空
      if (this.attrArr.some((item) => item.value == "")) {
        warningAlert("输入值不能为空");
        return;
      }
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
      requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          //置空
          this.empty();
          //关闭弹框
          this.cancel();
          //发起请求列表数据
          this.requestList();
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-button {
  width: auto;
}
</style>