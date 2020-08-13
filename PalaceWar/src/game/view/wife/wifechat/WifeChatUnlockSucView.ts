/**
 * author:qianjun
 * desc:解锁新物品界面
*/
class WifeChatUnlockSucView extends PopupView{

	public constructor() {
		super();
	}

	protected getResourceList():string[]{
        let arr1 = [`wifechatend`];
        let arr2 = [`wifeskingetline`,`wifeskinunlockavg`,`wifeskinunlockscene`,`wifeskinunlocksound`,`wifeskinlevelsceneicon`,`wifeskinlevelsoundicon`,`wifeskinlevelavgicon`,`specialview_effect_boomlight`,`specialvieweffect1`]
		return super.getResourceList().concat(this.param.data.end ? arr1 : arr2);
    }

    protected getBgName():string{
        return null;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected isTouchMaskClose():boolean{
        return true;
    }

	protected initView():void{	
        let view = this;
        if(view.param.data.end){
            let icon = BaseBitmap.create(`wifechatend`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, view);
            view.addChild(icon);
        }
        else{
            let skinId = view.param.data.skinId;
            let level = view.param.data.level;
            let skinCfg =  Config.WifeskinCfg.getWifeCfgById(skinId);
            let unit = skinCfg.levelUp[level - 1];
            if(unit && unit.levelUpUnlock){
                let tmp = String(unit.levelUpUnlock).split(`_`);
                //剧情、配音、背景
                let type = ``;
                if(tmp.length == 1){
                    //背景
                    type = `scene`;
                }
                else{
                    let id = Number(tmp[1]);
                    if(id < 200){
                        //剧情
                        type = `avg`;
                    }
                    else if(id < 300){
                        //有开关
                        if(Api.switchVoApi.checkWifeSkinSoundOpen(skinId)){
                            //配音
                            type = `sound`;
                        }
                    }
                }

                let icon = BaseBitmap.create(`wifeskinlevel${type}icon`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, view);
            
                let txt = BaseBitmap.create(`wifeskinunlock${type}`);
                txt.anchorOffsetX = txt.width / 2;
                txt.anchorOffsetY = txt.height / 2;
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, txt, icon, [0,-10]);

                let line = BaseBitmap.create(`wifeskingetline`);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, icon);
                
                view.addChild(line);
                view.addChild(icon);
                view.addChild(txt);

                if (App.CommonUtil.check_dragon()) {
                    line.alpha = icon.alpha = txt.alpha = 0;
                    view._maskBmp.alpha = 0;

                    /** 
                     * 压暗背景，0~0.7纯黑，用时0.3秒
                        开始播放获得标头龙骨动画，0.4秒后图标alpha值0~1用时0.24秒，标头砸下600%~80%~100%用时0~0.12~0.15秒
                    */
                    let beltDragonBones = App.DragonBonesUtil.getLoadDragonBones("specialgetreward_belt");
                    view.addChildAt(beltDragonBones, 1);
                    beltDragonBones.alpha = 0;
                    beltDragonBones.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, (event) => {
                        if (event.animationName == "open" && beltDragonBones) {
                            beltDragonBones.playDragonMovie('idle', 0);
                        }
                    }, this);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, beltDragonBones, line, [-20,80]);

                    let moveClip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 70);
                    let moveClipBM = BaseBitmap.create("specialvieweffect1");
                    moveClip.width = moveClipBM.width;
                    moveClip.height = moveClipBM.height;
                    moveClip.scaleX = 1.15;
                    moveClip.scaleY = 1.2;
                    this.addChildAt(moveClip, 2);
                    moveClip.playWithTime(-1);
                    moveClip.setVisible(false);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, moveClip, line);

                    let boomlight = BaseBitmap.create("specialview_effect_boomlight");
                    boomlight.anchorOffsetX = boomlight.width / 2;
                    boomlight.anchorOffsetY = boomlight.height / 2;
                    view.addChild(boomlight);
                    boomlight.blendMode = egret.BlendMode.ADD;
                    boomlight.alpha = 0;
                    App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, boomlight, icon);


                    egret.Tween.get(view._maskBmp).to({alpha : 0.7}, 300).call(()=>{
                        egret.Tween.removeTweens(view._maskBmp);
                        beltDragonBones.alpha = 1;
                        beltDragonBones.playDragonMovie(`open`, 1);
                        egret.Tween.get(icon).wait(400).call(()=>{
                            moveClip.setVisible(true);
                        }, view).to({alpha : 1}, 240).call(()=>{
                            egret.Tween.removeTweens(icon);
                        }, view);

                        boomlight.setScale(1.3);
                   
                        egret.Tween.get(boomlight).wait(400).set({alpha : 1}).to({ scaleX: 0.3, scaleY: 0.3 }, 170).to({ scaleX: 0.15, scaleY: 0}, 330).call(() => {
                            egret.Tween.removeTweens(boomlight);
                            txt.setScale(6);
                            txt.alpha = 1;
                            egret.Tween.get(txt).to({ scaleX: 0.8, scaleY: 0.8 }, 120).to({ scaleX: 1, scaleY: 1}, 150).call(() => {
                                egret.Tween.removeTweens(txt);
                            }, this);
                        }, this);
                    }, view);
                    

                   
                }
                else{
                    
                }
            }
        }
    }

    protected getShowWidth():number{
		return 627;
    }

	protected getShowHeight():number{
        return 577;
    }

    protected getTitleStr():string{
        return null;
    }

	public dispose():void{
        let view = this;
        let param=this.param;
		if(param.data.callback){
			param.data.callback.apply(param.data.handler);
		}
		super.dispose();
	}
}