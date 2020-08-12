var Api;
(function (Api) {
    var DailytaskVoApi;
    (function (DailytaskVoApi) {
        var taskInfoVo;
        var touchTaskIndex = 0;
        var touchID;
        function formatData(data) {
            if (!taskInfoVo) {
                taskInfoVo = new TaskInfoVo();
            }
            taskInfoVo.initData(data);
        }
        DailytaskVoApi.formatData = formatData;
        function getTaskInfoVo() {
            return taskInfoVo;
        }
        DailytaskVoApi.getTaskInfoVo = getTaskInfoVo;
        function canRefresh(index) {
            return taskInfoVo.freshFlag == 0 && taskInfoVo.taskInfo[index].f == 0;
        }
        DailytaskVoApi.canRefresh = canRefresh;
        function getRandomTaskByID(taskID) {
            var task;
            for (var index = 0; index < taskInfoVo.taskInfo.length; index++) {
                var element = taskInfoVo.taskInfo[index];
                if (element.id == taskID) {
                    task = element;
                    break;
                }
            }
            return task;
        }
        DailytaskVoApi.getRandomTaskByID = getRandomTaskByID;
        function getRandomTasks() {
            return taskInfoVo.taskInfo;
        }
        DailytaskVoApi.getRandomTasks = getRandomTasks;
        function getRandomTaskByIndex(index) {
            return taskInfoVo.taskInfo[index];
        }
        DailytaskVoApi.getRandomTaskByIndex = getRandomTaskByIndex;
        function getDailyGet(index) {
            switch (index) {
                case 0:
                    return taskInfoVo.freeGet1;
                case 1:
                    return taskInfoVo.freeGet2;
                case 2:
                    return taskInfoVo.freeGet3;
                default:
                    break;
            }
        }
        DailytaskVoApi.getDailyGet = getDailyGet;
        function getDailyBox() {
            var count = 0;
            count = (taskInfoVo.freeGet1 == 0) ? (count + 1) : count;
            count = (taskInfoVo.freeGet2 == 0) ? (count + 1) : count;
            count = (taskInfoVo.freeGet3 == 0) ? (count + 1) : count;
            taskInfoVo.taskInfo.forEach(function (element) {
                count = (element.f == 1) ? (count + 1) : count;
            });
            return count;
        }
        DailytaskVoApi.getDailyBox = getDailyBox;
        function dispose() {
            taskInfoVo = null;
        }
        DailytaskVoApi.dispose = dispose;
        function setTouchTaskIndex(value) {
            touchTaskIndex = value;
        }
        DailytaskVoApi.setTouchTaskIndex = setTouchTaskIndex;
        function getTouchTaskIndex() {
            return touchTaskIndex;
        }
        DailytaskVoApi.getTouchTaskIndex = getTouchTaskIndex;
        function getTouchID() {
            for (var index = 0; index < taskInfoVo.taskInfo.length; index++) {
                if (taskInfoVo.taskInfo[index].index == touchTaskIndex) {
                    return taskInfoVo.taskInfo[index].id;
                }
            }
            // return taskInfoVo.taskInfo[touchTaskIndex].id;
        }
        DailytaskVoApi.getTouchID = getTouchID;
        function getTaskListData() {
            var arr = [
                { type: 1 }
            ];
            var tem = [];
            for (var index = 0; index < taskInfoVo.taskInfo.length; index++) {
                if (taskInfoVo.taskInfo[index].f == 2) {
                    tem.push({ type: 2 });
                }
                else {
                    arr.push({ type: 2 });
                }
            }
            return arr.concat(tem);
        }
        DailytaskVoApi.getTaskListData = getTaskListData;
        function canGetOrpBox() {
            return Api.UserinfoVoApi.getCardBox() > 0;
        }
        DailytaskVoApi.canGetOrpBox = canGetOrpBox;
    })(DailytaskVoApi = Api.DailytaskVoApi || (Api.DailytaskVoApi = {}));
})(Api || (Api = {}));
//# sourceMappingURL=DailytaskVoApi.js.map