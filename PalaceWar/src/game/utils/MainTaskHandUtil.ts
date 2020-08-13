namespace App
{
    /**
     * 主线任务非强制引导的手
     * @author 赵占涛
     */
 	export class MainTaskHandUtil 
	{
        /** 自增序列，用来生成handMap的key */
        private static handSeq:number = 0;
        /** 放着所有的hand */
        private static handMap = {};

        /**
         * 添加一个引导的手
         * @param parentNode 要添加到的父节点
         * @param posX 要添加到的位置x
         * @param posY 要添加到的位置y
         * @param touchTarget 受哪个点击元素控制
         * @param questType 任务类型
         * @param once 是否点击一次就消失
         * @param secondConditionCb 第二判断条件（addHandNode方法的调用可能本身已经在某个条件内了，一些耗时判断，可以当第二条件来写，如果设置once为false，那么点击后也会再判断一下此条件）
         * @param secondConditionCbThis 第二条件的this
         * @returns 返回一个key，用于移除
         */
        public static addHandNode(parentNode:egret.DisplayObjectContainer, posX:number, posY:number, touchTarget:Array<any>, questType:number, once:boolean, secondConditionCb:()=>boolean, secondConditionCbThis:any, handScale?:number):string {
            let taskId = Api.mainTaskVoApi.getCurMainTaskId();
            if (!taskId) {
                return;
            }
            let cfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (!cfg) {
                return;
            }
            if (cfg.questType !== questType) {
                return;
            }
            if (Api.mainTaskVoApi.isCurTaskReach()) {
                return;
            }
            if (typeof(secondConditionCb)=== "function") {
                if (!secondConditionCb.call(secondConditionCbThis)) {
                    return;
                }
            }

            var _taskHand = BaseBitmap.create("guide_hand");
            _taskHand.name = "taskHand";
            _taskHand.x = posX;
            _taskHand.y = posY;
            _taskHand.rotation = 0;
            parentNode.addChild(_taskHand);
            let scale = 1;
            if (handScale){
                _taskHand.setScale(handScale);
                scale = handScale;
            }

            egret.Tween.get(_taskHand,{loop:true})
                .to({y:_taskHand.y +35,scaleX: scale+0.3,scaleY: scale+0.3}, 500)
                .to({y:_taskHand.y ,scaleX: scale,scaleY: scale}, 500)
            
        
            MainTaskHandUtil.handSeq ++;
            let handKey = "handKey_" + MainTaskHandUtil.handSeq;
            MainTaskHandUtil.handMap[handKey] = {
                hand                    : _taskHand,
                touchTarget             : touchTarget,
                once                    : once,
                secondConditionCb       : secondConditionCb,
                secondConditionCbThis   : secondConditionCbThis
            };
            return handKey;
        }
        public static lastTouchTargetCheck(touchTarget) {
            for (var handKey in MainTaskHandUtil.handMap) {
                if (MainTaskHandUtil.handMap.hasOwnProperty(handKey)) {
                    // 一个引导信息
                    var element = MainTaskHandUtil.handMap[handKey];
                    if (element.willDelete) {
                        // 如果准备要删除了，就跳过
                        continue;
                    }
                    if (!element.touchTarget) {
                        // 如果没有指定按钮，就跳过
                        continue;
                    }
                    for (var index = 0; index < element.touchTarget.length; index++) {
                        var elementTarget = element.touchTarget[index];
                        // 如果点击了对应的按钮，那么分两种情况：点一次就消失、再次判断条件决定是否消失
                        if (elementTarget === touchTarget && (element.once || !element.secondConditionCb.call(element.secondConditionCbThis))) {
                            element.willDelete = true;
                            element.hand.visible = false;
                        }
                    }
                }
            }
        }
        /** 释放handKey */
        public static releaseHandKey(handKey:string) {
            if (handKey && MainTaskHandUtil.handMap[handKey]) {
                let element = MainTaskHandUtil.handMap[handKey];
                if (!element.willDelete) {
                    element.hand.visible = false;
                }
                delete MainTaskHandUtil.handMap[handKey];
            }
        }
        /** 用于由外部临时隐藏引导的手，由于点击而消失掉的手 */
        public static hideHandKey(handKey:string) {
            if (handKey && MainTaskHandUtil.handMap[handKey]) {
                let element = MainTaskHandUtil.handMap[handKey];
                element.hand.visible = false;
            }
        }
        /** 用于重新显示被临时隐藏的引导手 */
        public static showHandKey(handKey:string) {
            if (handKey && MainTaskHandUtil.handMap[handKey]) {
                let element = MainTaskHandUtil.handMap[handKey];
                if (!element.willDelete) {
                    element.hand.visible = true;
                }
            }
        }
        /** 用于调整位置 */
        public static getHand(handKey:string) {
            if (handKey && MainTaskHandUtil.handMap[handKey]) {
                let element = MainTaskHandUtil.handMap[handKey];
                return element;
            }
            else{
                return null;
            }
        }
    }
}