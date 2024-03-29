<template>
  <div v-show="showContext" :style="menuStyle">
    <div v-show="!showOption">
      <ul class="list-unstyled">
        <li v-if="node.parent" @mousedown="openOptions('parent')">
          <span class="icon">
            <i class="fas fa-caret-up"></i>
          </span>
          <span>Create Sibling Feature</span>
        </li>
        <li @mousedown="openOptions('node')">
          <span class="icon">
            <i class="fas fa-caret-down"></i>
          </span>
          <span>Create Child Feature</span>
        </li>

        <li
          v-if="node.model.type !== 'r' && node.model.type !== ''"
          @click="action('swapType')"
        >
          <span class="icon">
            <i class="fas fa-exchange-alt"></i>
          </span>
          <span v-if="node.model.type === 'o'">Change to Mandatory</span>
          <span v-if="node.model.type === 'm'">Change to Optional</span>
          <span v-if="node.model.type === 'g'">Swap Multiplicity</span>
        </li>

        <li v-if="node.model.type !== 'g'" @click="action('Rename')">
          <span class="icon">
            <i class="fas fa-edit"></i>
          </span>
          <span>Rename</span>
        </li>
        <li
          class="is-danger"
          v-if="node.model.type !== 'r'"
          @click="confirmeDeletion"
        >
          <span class="icon">
            <i class="fas fa-trash-alt"></i>
          </span>
          <span>Remove</span>
        </li>
      </ul>
    </div>

    <div v-show="showOption">
      <ul class="options">
        <li @click="showOption = false">
          <span class="icon">
            <i class="fas fa-caret-left"></i>
          </span>
          <span>Back</span>
        </li>
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="action(item.title)"
        >
          <span class="icon">
            <i :class="item.icon"></i>
          </span>
          <span>{{ item.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["treeTypes", "node", "mouseEvent", "clickedOutside"],

  data() {
    return {
      data: [],
      whoisNode: "node",
      showContext: false,
      showOption: false,
      menuStyle: null,
    };
  },

  methods: {
    closeMenu() {
      this.showOption = false;
      this.showContext = false;
    },

    action(title) {
      this.$emit("contextSelected", { title: title, whois: this.whoisNode });
      this.closeMenu();
    },

    confirmeDeletion() {
      this.$dialog.confirm({
        title: "Confirm deletion",
        message: "Do you really want to exclude this feature?",
        type: "is-danger",
        cancelText: "Cancel",
        confirmText: "Delete",
        onConfirm: () => this.action("Remove"),
      });
    },

    openOptions(whois) {
      if (whois === "parent") this.data = this.node["parent"]["validChildren"];
      else this.data = this.node["validChildren"];
      this.whoisNode = whois;
      this.$nextTick(() => {
        this.showOption = true;
      });
    },
  },

  watch: {
    async clickedOutside() {
      if (this.clickedOutside) {
        this.showContext = false;
      }
    },

    mouseEvent() {
      if (this.mouseEvent.button === 2) {
        this.menuStyle = {
          width: "210px",
          left: this.mouseEvent.pageX + "px",
          top: this.mouseEvent.pageY + "px",
          border: "1px solid #ddd",
          position: "absolute",
          "border-radius": "5px",
          "background-color": "#fff",
          "box-shadow": "2px 2px 2px #aaa",
          "z-index": 20,
        };
        this.showContext = true;
        this.showOption = false;
      }
    },
  },

  mounted() {
    this.data = this.node.validChildren;
  },
};
</script>

<style scoped>
ul {
  display: block;
  margin: 0;
}

ul li {
  list-style: none;
  cursor: pointer;
  padding: 5px 10px;
}

li:hover {
  background: rgba(83, 215, 220, 0.3);
}

.is-danger:hover {
  background: #ffb6b6;
}

.icon {
  max-width: 30px;
}

span i {
  font-size: 1rem;
  margin-right: 5px;
  margin: 0 auto;
}

/* .options {
  position: absolute;
}

.options::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  right: -5px;
  top: 68px;
  border-top: 12px solid transparent;
  border-bottom: 0px solid white;
  border-left: 12px solid white;
  -webkit-box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  -moz-box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  box-shadow: -2px 2px 2px 0px rgba(black, 0.25);
  transform: rotate(50deg);
  -moz-transform: rotate(50deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -webkit-transform: rotate(225deg);
} */
</style>
