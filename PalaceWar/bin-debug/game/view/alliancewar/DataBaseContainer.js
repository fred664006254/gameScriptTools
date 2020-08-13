var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DataBaseContainer;
(function (DataBaseContainer) {
    var SingleLinkList = (function () {
        function SingleLinkList() {
            this.head = null;
            this.head = new Node('head');
        }
        //尾节点插入数据
        SingleLinkList.prototype.insertToTail = function (data) {
            var newNode = new Node(data);
            var tmp = this.head;
            while (tmp.next != null) {
                tmp = tmp.next;
            }
            tmp.next = newNode;
        };
        //头结点插入数据
        SingleLinkList.prototype.insertToHead = function (data) {
            var newNode = new Node(data);
            var tmp = this.head;
            while (tmp.next != null) {
                tmp = tmp.next;
            }
            tmp.next = newNode;
        };
        //删除数据
        SingleLinkList.prototype.delete = function (data) {
            var tmp = this.head;
            while (tmp.data !== data) {
                tmp = tmp.next;
            }
        };
        return SingleLinkList;
    }());
    DataBaseContainer.SingleLinkList = SingleLinkList;
    __reflect(SingleLinkList.prototype, "DataBaseContainer.SingleLinkList");
    var Node = (function () {
        function Node(data) {
            this.data = data;
            this.next = null;
        }
        return Node;
    }());
    __reflect(Node.prototype, "Node");
})(DataBaseContainer || (DataBaseContainer = {}));
//# sourceMappingURL=DataBaseContainer.js.map