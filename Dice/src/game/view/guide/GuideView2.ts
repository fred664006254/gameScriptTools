// export class GuideView extends CommonView {

//     public static mx_support(): Array<string> {
//         return ["assets.guide", "api.GUIDESTEP", "api.SOUND"];
//     }

//     private rect_g: BaseDisplayObjectContainer;//屏蔽点击组
//     public bg0_rect: egret.Shape;//中央点击穿透区域
//     private bg1_rect: eui.Rect;//上
//     private bg2_rect: eui.Rect;//左
//     private bg3_rect: eui.Rect;//右
//     private bg4_rect: eui.Rect;//下
//     private tyuan: eui.Image;

//     private msg_g: eui.Group;//提示文本组。
//     private msg_tip_g: eui.Group;
//     private msg_t: eui.Label;//提示文本。

//     private role: eui.Image;
//     private rolebq: eui.Image;
//     private r_name_t: eui.Label;
//     private con_t: eui.Label;
//     private next_p2: eui.Image;

//     private music_b: eui.Rect;
//     private xlba_m: eui.Image;
//     private effect_g: eui.Group;
//     private c_music;

//     private ef_g: eui.Group//动画组

//     public constructor(data?: any) {
//         super(data);
//         this.touchEnabled = false;
//     }

//     protected init_view(): void {
//         let facade = ApplicationFacade.getInstance();
//         facade.registerMediator(new GuideMediator(this));
//         this.effect_g.visible = false;
//         this.tyuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
//         this.bg0_rect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
//         this.music_b.addEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);

//         if (this.adata && this.adata.skip) {//跳引导
//             facade.sendNotification(MX_NOTICE.SKIP_GUIDE, this.adata);
//             facade.sendNotification(MX_NOTICE.GET_GUIDE);
//             return;
//         }
//         this.fresh_screen(this.adata);
//     }

//     private rect_click(e?: egret.TouchEvent): void {
//         this.visible = false;//点击之后隐藏当前引导，直到下一步引导出现

//         let facade = ApplicationFacade.getInstance();

//         if (this.c_music) {
//             this.c_music = null;
//             facade.sendNotification(MX_NOTICE.CLOSE_MUSIC, true);
//         }

//         facade.sendNotification(MX_NOTICE.GUIDE_CLICK, this.adata);
//     }

//     public on_remove(): void {
//         this.tyuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
//         this.bg0_rect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rect_click, this);
//         this.music_b.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.play_music, this);

//         if (this.c_music) {
//             this.c_music = null;
//             ApplicationFacade.getInstance().sendNotification(MX_NOTICE.CLOSE_MUSIC, true);
//         }

//         ApplicationFacade.getInstance().removeMediator(GuideMediator.NAME);
//     }

//     public fresh_screen(data?: any): void {
//         let facade = ApplicationFacade.getInstance();
//         this.music_b.visible = false;
//         this.msg_tip_g.touchEnabled = false;
//         this.msg_tip_g.touchChildren = false;

//         if (!data) {//没有数据直接显示下一引导
//             this.visible = false;
//             facade.sendNotification(MX_NOTICE.GET_GUIDE);
//             return;
//         }
//         this.adata = data;
//         this.visible = true;
//         this.msg_g.visible = false;

//         if (data.touchrect) {//需要指引玩家点击
//             let c_k = data.touchrect.split("|")[0];
//             switch (c_k) {
//                 case "v"://从弹窗获取引导位置。
//                 case "s"://从场景获取引导位置。
//                     facade.sendNotification(MX_NOTICE.GUIDE_POS, data);//获取引导位置。
//                     break;
//                 case "j"://没有点击直接发送消息。
//                     this.rect_click();
//                     break;
//                 case "n"://全屏点击，然后发送消息
//                     this.reset_pos();
//                     break;
//             }
//         } else {//只做文字提示,
//             this.reset_pos();//不传参数时，全屏点击
//         }
//     }

//     public reset_pos(pos?: any): void {
//         this.reset_rect_g(pos);//重置响应区域

//         if (pos) {
//             this.ef_g.visible = true;
//             this.reset_ef_g();//添加引动点击动画
//         } else {//全屏响应
//             this.ef_g.visible = false;
//             this.msg_g.y = Tools.screen_height * 0.618;
//         }

//         this.reset_msg_g();
//     }

//     private play_music(e?: egret.TouchEvent): void {
//         this.add_music_effect();
//         let facade = ApplicationFacade.getInstance();
//         facade.sendNotification(MX_NOTICE.PLAY_MUSIC, {
//             "name": this.c_music, "type": "yuyin"
//         });
//     }

//     private reset_msg_g(): void {
//         let data = this.adata;

//         if (data.msg && data.msg != "") {//有提示文本
//             this.msg_g.visible = true;
//         } else {
//             return;
//         }

//         let gproxy = <GuideProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GuideProxy.NAME));
//         let str: string = data.msg;

//         let cmk: string = '';
//         if (str.indexOf("{10}") > -1) {
//             str = str.replace("{10}", gproxy.slt_info.name);
//             cmk = this.get_sound_name(data.sound_id);
//         } else if (str.indexOf("{15}") > -1) {
//             str = str.replace("{15}", gproxy.slt_info.rname);

//         } else if (str.indexOf("{3}") > -1) {//皇子皇女
//             let pproxy = <PalaceProxy><any>(ApplicationFacade.getInstance().retrieveProxy(PalaceProxy.NAME));
//             let c_zn;
//             if (pproxy['hzs_list1'] && pproxy['hzs_list1'][1] && pproxy['hzs_list1'][1][0]) {
//                 c_zn = pproxy['hzs_list1'][1][0];
//             }
//             let csex = c_zn ? c_zn.sex : 1;//默认女
//             if (csex == 1) {
//                 str = str.replace("{3}", Lang.hg046);//公主
//             } else {
//                 str = str.replace("{3}", Lang.hg045);//皇子
//             }
//             cmk = this.get_sound_name(data.sound_id, 3, csex);
//         } else if (str.indexOf("{7}") > -1) {
//             let pproxy = <PalaceProxy><any>(ApplicationFacade.getInstance().retrieveProxy(PalaceProxy.NAME));
//             let c_zn;
//             if (pproxy['hzs_list1'] && pproxy['hzs_list1'][1] && pproxy['hzs_list1'][1][0]) {
//                 c_zn = pproxy['hzs_list1'][1][0];
//             }
//             let csex = c_zn ? c_zn.sex : 1;//默认女
//             if (csex == 1) {
//                 str = str.replace("{7}", Lang.p0057);//公主
//             } else {
//                 str = str.replace("{7}", Lang.p0056);//皇子
//             }
//         } else {
//             cmk = this.get_sound_name(data.sound_id);
//         }
//         this.msg_t.text = str;//引导文本

//         if (RES.hasRes(cmk + "_mp3")) {//存在该音乐文件
//             this.music_b.visible = true;
//             this.c_music = cmk;
//             this.play_music();
//         }
//     }

//     private add_music_effect() {
//         this.xlba_m.visible = false;
//         let yuyin_eff: GeneralEffect = <GeneralEffect>this.effect_g.getChildByName("guide_yuyin");
//         if (!yuyin_eff) {
//             yuyin_eff = new GeneralEffect("guide_yuyin");
//             yuyin_eff.play_by_times(-1);
//             yuyin_eff.name = "guide_yuyin";
//             this.effect_g.addChild(yuyin_eff);
//             this.effect_g.visible = true;
//         }
//     }

//     public remove_music_effect(data?: any) {
//         if (data && data.name == this.c_music) {
//             let yuyin_eff: GeneralEffect = <GeneralEffect>this.effect_g.getChildByName("guide_yuyin");
//             if (yuyin_eff) {
//                 while (this.effect_g.numChildren > 0) {
//                     this.effect_g.removeChildAt(0);
//                 }
//             }
//             this.effect_g.visible = false;
//             this.xlba_m.visible = true;
//         }
//     }

//     private get_sound_name(sound_id: string, type: number = 10, sex?: number): string {
//         let sid: number = 0;
//         if (String(sound_id).indexOf(",") < 0 && String(sound_id).indexOf("_") < 0) {
//             sid = Number(sound_id);
//         } else {
//             let gproxy = <GuideProxy><any>(ApplicationFacade.getInstance().retrieveProxy(GuideProxy.NAME));
//             let sound_arr: any = sound_id.split(",");
//             let arr1: any = {};
//             let tmp: any;
//             for (let k in sound_arr) {
//                 tmp = sound_arr[k].split("_");
//                 arr1[tmp[1]] = tmp[0];
//             }
//             if (type == 10) {
//                 sid = Number(arr1[gproxy.slt_role]);
//             } else if (type == 3) {
//                 if (sex) {
//                     sid = Number(arr1[sex]);
//                 } else {
//                     sid = Number(arr1[1]);
//                 }
//             } else {
//                 sid = 1;
//             }
//         }

//         let sound_name: string = Tools.get_guide_sound(sid);

//         return sound_name;
//     }

//     private reset_rect_g(pos?: any): void {//重置点击区域
//         let screen_width = GameConfig.stageWidth;
//         let screen_height = GameConfig.stageHeigth;

//         let rect = this.bg0_rect;
//         if (!pos) {
//             this.tyuan.visible = false;
//             rect.visible = true;
//             rect.touchEnabled = true;
//             pos = { "x": 0, "y": 0, "width": screen_width, "height": screen_height };
//         } else {
//             this.tyuan.visible = true;
//             rect.visible = false;
//             rect.touchEnabled = false;

//             pos.y += Math.ceil((pos.height - 150) / 2);
//             pos.x += Math.ceil((pos.width - 150) / 2);
//             pos.width = 150;
//             pos.height = 150;
//         }

//         for (let k in pos) {
//             rect[k] = pos[k];//屏蔽没有宽高导致引导无法点击
//             this.tyuan[k] = pos[k];
//         }

//         this.bg1_rect.height = rect.y < 0 ? 0 : rect.y;//上
//         this.bg2_rect.y = this.bg3_rect.y = rect.y;//左右
//         this.bg2_rect.height = this.bg3_rect.height = rect.height;
//         this.bg2_rect.width = rect.x < 0 ? 0 : rect.x;
//         this.bg3_rect.width = Math.max(0, screen_width - rect.x - rect.width);
//         this.bg4_rect.y = rect.y + rect.height;//下
//         this.bg4_rect.height = Math.max(0, screen_height - rect.y - rect.height);//下

//         if (rect.y > screen_height * 0.6) {
//             this.msg_g.y = rect.y - this.msg_g.height;
//         } else {
//             this.msg_g.y = rect.y + 150;
//         }
//     }

//     private reset_ef_g(): void {//点击光效位置
//         let rect = this.bg0_rect;
//         let basex = rect.x + rect.width * 0.5;
//         let basey = rect.y + rect.height * 0.5;

//         let ydef: GeneralEffect = <GeneralEffect>this.ef_g.getChildByName("yddh");
//         if (!ydef) {
//             ydef = new GeneralEffect("yddh");
//             ydef.play_by_times(-1);
//             ydef.name = "yddh";
//             this.ef_g.addChild(ydef);
//         }
//         ydef.x = basex;
//         ydef.y = basey;
//         ydef.scaleX = ydef.scaleY = 1.5;

//         let ef: GeneralEffect = <GeneralEffect>this.ef_g.getChildByName("guide");
//         if (!ef) {
//             ef = new GeneralEffect("dianji");
//             ef.play_by_times(-1);
//             ef.name = "guide";
//             this.ef_g.addChild(ef);
//         }

//         if (basex > 480) {
//             ef.x = basex - 20;
//             ef.scaleX = -1;
//         } else {
//             ef.x = basex + 20;
//             ef.scaleX = 1;
//         }

//         if (basey < Tools.screen_height - 60) {
//             ef.y = basey + 20;
//         } else {
//             ef.y = basey - 20;
//         }
//     }
// }