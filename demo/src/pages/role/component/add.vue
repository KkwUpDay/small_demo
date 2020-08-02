<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- 标注1111    :default-checked-keys="defaultKey"   return中给个空数组接收 -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入状态层
import { mapActions, mapGetters } from "vuex";
//引入弹框
import { successAlert, warningAlert } from "../../../util/alert";
import {
  requestRoleAdd,
  requestRoleList,
  requestRoleDetail,
  requestRoleUpdate,
} from "../../../util/request";
// ------------------------------------
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  // ---------------------data--------------------
  data() {
    return {
      formLabelWidth: "120px",
      //提交给后端的数据
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey: [], //标注1111
      //树形结构的数据
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  //-----------------------------mounted----------------
  mounted() {
    //如果进来之前已经请求过了,就不用再次请求
    if (this.menuList.length == 0) {
      this.requestMenuList();
    }
  },

  //-----------------------方法------------------------
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestList",
      //获取role列表
      requestRoleList: "role/requestList",
    }),
    //取消弹框显示
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //重置
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //将树形结构的数据，选中的key置空
      this.$refs.tree.setCheckedKeys([]);
    },

    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // console.log(this.form);
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          //置空
          this.empty();
          //关闭弹框
          this.cancel();
          //添加完成后,获取数据列表
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取一条数据
    getDetail(id) {
      //获取一个id,发起ajax请求
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey = JSON.parse(res.data.list.menus);
      });
    },

    //点击修改
    updata() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          this.empty();
          this.cancel();
          //再次请求刷新
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>
<style scoped>
</style>