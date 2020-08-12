/**
 * 选择boss
 * author qianjun
 */
class SelectBossPopupView extends PopupView{

	public constructor() {
		super();
    }
    
	// 打开该面板时，需要传参数msg
	public initView():void{
        App.MsgHelper.addEvt(MsgConst.BT_HIDE_SELECTBOSS,this.closeHandler,this);
        let view = this;
        SoundMgr.playEffect(`effect_random_boss`);

        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;

        let bottombg = BaseBitmap.create(`selectbossbottombg`);
        view.addChild(bottombg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottombg, view);

        let top = BaseBitmap.create(`selectbossbg`);
        view.addChild(top);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, top, bottombg, [0,280]);

        let randTxtImg = BaseBitmap.create(`selectrandomboss`);
        view.addChild(randTxtImg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, randTxtImg, top);

        let namebg = BaseBitmap.create(`selectbossnamebg`);
        view.addChild(namebg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, bottombg, [0,bottombg.height-namebg.height/2]);
        namebg.alpha = 0;

        let selectboss = view.param.data.id;

        let nametxt = ComponentMgr.getTextField( LangMger.getlocal(`monster_boss_name_${selectboss}`), TextFieldConst.SIZE_38);
        view.addChild(nametxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nametxt, namebg, [0,4]);
        nametxt.alpha = 0;

        // let loopclip = ComponentMgr.getCustomMovieClip(`bossselectloop`, null, 70);
        // loopclip.anchorOffsetX = 400 / 2;
        // loopclip.anchorOffsetY = 400 / 2;
        // view.addChild(loopclip);
        // loopclip.alpha = 0;


        // clip.setScale(0);

       
        let bossKey = Config.MonsterCfg.getBossKeys();

        let arr = [`1001`, `1002`, `1003`, `1004`,`1001`, `1002`, `1003`, `1004`, `1001`, `1002`, `1003`, `1004`];
        let scrollist = ComponentMgr.getScrollList(SelectBossItem, arr, new egret.Rectangle(0,0,213*arr.length,168),null,arr.length);//213*arr.length
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scrollist, bottombg, [0,-scrollist.height/2-20]);
        view.addChild(scrollist);
        scrollist.verticalScrollPolicy = `off`;
        scrollist.horizontalScrollPolicy = `on`;
        scrollist.bounces = false;
        scrollist.touchChildren = false;
        scrollist.touchEnabled = false;
        scrollist.scrollLeft = 0;

        let clip = ComponentMgr.getCustomMovieClip(`bossselectstart`, null, 70);
        clip.anchorOffsetX = 400 / 2;
        clip.anchorOffsetY = 400 / 2;
        view.addChild(clip);

        clip.setEndCallBack(()=>{
            if(this.param.data.isFrist)
            {
                egret.Tween.get(clip).to({alpha:0},500);
            }
            else
            {
                clip.dispose();
                clip = null;
                this.closeHandler();
                // loopclip.alpha = 1;
                // loopclip.playWithTime(-1);
            }
        }, view);

        clip.x = 320;
        clip.y = scrollist.y + 20;
        
        // if(true){

        // }

        let selectid = 1 * bossKey.length +  arr.indexOf(selectboss);
        
        // scrollist.setScrollLeftByIndex(selectid, 4000),
    
        egret.Tween.get(scrollist).wait(100).to({scrollLeft : (selectid - 1) * 213 + 5}, 1500, egret.Ease.circOut).call(()=>{
            let item = <SelectBossItem>scrollist.getItemByIndex(selectid);
            item.showSelect();
            // loopclip.setStopFrame(1);
            // loopclip.alpha = 0.5;


            egret.Tween.get(clip).wait(400).call(()=>{
                clip.alpha = 1;
                clip.playWithTime(1);
                egret.Tween.removeTweens(clip);
            },view);


            egret.Tween.get(namebg).to({alpha : 1}, 300).call(()=>{
                egret.Tween.removeTweens(namebg);
            },view);

            egret.Tween.get(nametxt).to({alpha : 1}, 300).call(()=>{
                egret.Tween.removeTweens(nametxt);
            },view);
        }, view);

        // scrollist.setScrollLeft((selectid - 1) * 213, 3000, egret.Ease.circOut);


        // egret.Tween.get()
        // let bossid = view.param.data.id;
    }

	protected isTouchMaskClose():boolean{
		return false;
	}
    
    protected getBgName(){
        return null;
    }
    
    protected getTitleBgName(){
        return null;
	}

    protected getTitleStr(){
        return null;
	}
	
	protected getCloseBtnName():string{
		return null;//this.param.data.needClose === 1 ? 
	}

	protected closeHandler(){
        let param=this.param;
        if(param.data.callback){
			param.data.callback.apply(param.data.handler,[this]);
		}
		super.closeHandler();
	}

	public hide(){		
		super.hide()
    }
    

	protected getResourceList():string[]{	
		return [];
	}

	public dispose():void{
        App.MsgHelper.removeEvt(MsgConst.BT_HIDE_SELECTBOSS,this.closeHandler,this);
		super.dispose();
	}
}