var MsgConst;
(function (MsgConst) {
    /**监控所有model刷新 */
    MsgConst.REFRESH_MODEl = "refresh_model";
    MsgConst.MODEL_PAYMENT = "pay.ment";
    MsgConst.CHECK_SERVER = "check_server";
    MsgConst.HIDE_LAST_SCENE = "hide_last_scene";
    MsgConst.IOS_BINDPHONE = "ios_bindphone";
    MsgConst.LOGOUT = "logout";
    MsgConst.RSDK_INIT_SUCCESS = "rsdk_init_success";
    // export const GAMECONFIG_LOADED:string="gameconfig_loaded";
    MsgConst.MODEL_USERINFO = "model_userinfo";
    MsgConst.SOCKET_RECOUNT = "socket_recount";
    MsgConst.DPOBJCTR_ADDSTAGE = "dpobjctr_addstage";
    MsgConst.DPOBJCTR_REMOVESTAGE = "dpobjctr_removestage";
    MsgConst.MODEL_SHOP = "model_shop";
    MsgConst.MODEL_GAMEINFO = "model_gameinfo";
    MsgConst.MODEL_MYMAIL = "model_mymail";
    MsgConst.MODEL_DAILYTASK = "model_dailytask";
    MsgConst.MODEL_DICE = "model_dice";
    MsgConst.MODEL_FAIRARENA = "model_fairArena";
    MsgConst.MODEL_SIGNINFO = 'model_signinfo';
    MsgConst.MODEL_ACHIEVEMENT = 'model_achievement';
    MsgConst.MODEL_INVITEFRIEND = 'model_inviteFriend';
    /**怪物跑了，发通知 */
    MsgConst.MONSTER_SURVIVE = "monster_survive";
    /**战斗增加能力值 */
    MsgConst.BTLE_ADD_SP = "btle_add_sp";
    /**收到的数据无法解析，发通知 */
    MsgConst.SC_DECODE_ERROR = "sdata_decode_error";
    /**骰子信息点击*/
    MsgConst.DICE_INFOCLICK = "dice_infoclick";
    /**骰子使用替换队列*/
    MsgConst.DICE_CHANGETOTEAM = "dice_changetoteam";
    /**前往商城购买战令*/
    MsgConst.ROYAL_GOSHOP = "royal_goshop";
    MsgConst.ROYAL_GODICE = "royal_godice";
    /**更新记录点击*/
    MsgConst.UPDATELOG_SHOWIDX = "updatelog_showidx";
    /** 前往商城 */
    MsgConst.GOSHOP = 'goshop';
    MsgConst.SCROLLTOINDEX = 'ScrollToIndex';
    MsgConst.SHOWSTRESSLIGHT = "stresslight";
    /**领取随机任务的奖励 */
    MsgConst.REWARD_RANDOM_TASK = "reward_random_task";
    /**资源数发生变化*/
    MsgConst.USERRES_CHANGE = "userres_change";
    /** 显示表情的骨骼动画 */
    MsgConst.CHAT_DRAGON_BONES_SHOW = "chat_dragon_bones_show";
    /** 回合数发生变化 */
    MsgConst.BT_NEXT_ROUND = "bt_next_round";
    /** 骰子被拖动 */
    MsgConst.DICE_MOVE_FORCOMPOSE = "dice_move_forcompose";
    /**怪物被杀死 */
    MsgConst.BT_KILL_MONSTER = "bt_kill_monster";
    /**创建一个骰子*/
    MsgConst.BATTLECREATE_DICE = "battlecreate_dice";
    MsgConst.SHOW_GUIDE = "show_guide";
    MsgConst.GUIDE_CLICK = "guide_click";
    MsgConst.CLOSE_GUIDE = "close_guide";
    /**怪物动作加载完成首次显示出来 */
    MsgConst.BT_EFFECT_FIRST_SHOW = "bt_effect_first_show";
    /**播放飞水滴的效果 */
    MsgConst.FLY_EFFECT = "fly_effect";
    MsgConst.FINISH_GUIDE_BUBBLE = "finish_guide_bubble";
    /**关闭公告弹窗 */
    MsgConst.CLOSE_NOTICE_POPUP = "close_notice_popupview";
    /**关闭list的触摸事件 */
    MsgConst.END_TOUCH_LIST = "end_touch_list";
    /**关闭对战boss选择动画 */
    MsgConst.BT_HIDE_SELECTBOSS = "bt_hide_selectboss";
    /**升级小鸟后，暴击伤害增加的文字效果 */
    MsgConst.TWEEN_CIRT_NUM = "tweencirtnum";
})(MsgConst || (MsgConst = {}));
//# sourceMappingURL=MsgConst.js.map