/**
 * 头像框展示
 * author ycg
 * date 2019.10.10
 * @class AcCommonRewardHeadTitleView
 */
class AcCommonRewardHeadTitleView extends CommonViewTab{
    private data:any = null;

    public constructor(params:any){
        super();
        if (params){
            this.data = params;
        }
        // egret.callLater(this.initView, this);
    }

    protected initView():void{
        // if (this.data){
        //     let container = null;
        //     let idType = (this.data.idType).split("_");
        //     container = this.getTitleView(idType[1], this.data.bgName);
        //     this.width = container.width;
        //     container.setPosition(0,0);
        //     this.addChild(container);
        // }
	}
	
	protected init():void{
		if (this.data){
            let container = null;
            let idType = (this.data.idType).split("_");
            container = this.getTitleView(idType[1], this.data.bgName);
            this.width = container.width;
            container.setPosition(0,0);
            this.addChild(container);
        }
	}

    //头像框
    private getTitleView(titleid:string, bgName:string):BaseDisplayObjectContainer{
        let container = new BaseDisplayObjectContainer();
        container.width = 540;
        let view:BaseDisplayObjectContainer = container;
        let bgNameStr = `battlepassrewardbg`;
        if (bgName){
            bgNameStr = bgName;
        }
		let bigbg = BaseLoadBitmap.create(bgNameStr);
        // bigbg.height = 677;
        bigbg.width = 540; //544
        bigbg.height = 710; //730
		bigbg.setPosition(0, 0);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bigbg, view);
		container.addChild(bigbg);

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bigbg);
		view.addChild(topbg);

		let tcfg = Config.TitleCfg.getTitleCfgById(titleid);
		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acRechargeBoxSpHeadTitleTip"),20);
		tipTxt.lineSpacing = 5;
		tipTxt.width = topbg.width - 20;
		tipTxt.textAlign = egret.HorizontalAlign.CENTER;
		topbg.height = tipTxt.textHeight + 30;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0,10]);
		view.addChild(tipTxt);

		let pos1 = {
			1 : {
				scale : 0.7, layout : LayoutConst.rightbottom, dis : [50,70], arrowx : -20, arrowy : 15, rotaion : 120, 
			},
			2 : {
				scale : 0.7, layout : LayoutConst.horizontalCenterbottom, dis : [0,140], arrowx : -25, arrowy : -5, rotaion : 120, 
			},
			3 : {
				scale : 0.8, layout : LayoutConst.leftbottom, dis : [20,250], arrowx : 135, arrowy : 0, rotaion : -120, 
			},
			4 : {
				scale : 0.9, layout : LayoutConst.horizontalCenterbottom, dis : [-15,370],arrowx : 145, arrowy : 30, rotaion : -120, 
			},
			5 : {
				scale : 1, layout : LayoutConst.rightbottom, dis : [25,460]
			},
			
        }
        
        let pos2 = {
            1 : {
				scale : 0.8, layout : LayoutConst.rightbottom, dis : [70,70], arrowx : -110, arrowy : -15, rotaion : 125, 
			},
			2 : {
				scale : 0.9, layout : LayoutConst.leftbottom, dis : [50,270], arrowx : 195, arrowy : -40, rotaion : -130, 
            },
            3 : {
				scale : 1, layout : LayoutConst.rightbottom, dis : [55, 480]
			},
        }

		if(tcfg.changePic){
            let pos = {};
            if (tcfg.changePic.length == 3){
                pos = pos2;
            }
            else if (tcfg.changePic.length == 5){
                pos = pos1;
            }
			for(let i in tcfg.changePic){
				let unit = tcfg.changePic[i];
				let idx = Number(i) + 1;
				let poscfg = pos[idx];
				let group = new BaseDisplayObjectContainer();
				view.addChild(group);
				group.setScale(poscfg.scale);

				let ishead = tcfg.isTitle == 2;
				let headbg = BaseBitmap.create(`battlepassrewardbg${ishead ? 2 : 1}`);
				group.addChild(headbg);

				let headcircle = ishead ? App.CommonUtil.getHeadPic(tcfg.id, unit) : App.CommonUtil.getTitlePic(tcfg.id, unit);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headcircle, headbg, [0,ishead?5:50]);
				group.addChild(headcircle);

				// let effName = `head_${tcfg.id}_${idx}effect`;
				// if(RES.hasRes(effName)){
				// 	let clip = ComponentManager.getCustomMovieClip(effName, 10, 130);
				// 	let skinTxtEffectBM = BaseLoadBitmap.create(`${effName}1`,null,{
				// 		callback:()=>{
				// 			clip.width = skinTxtEffectBM.width;
				// 			clip.height = skinTxtEffectBM.height;
				// 			clip.playWithTime(-1);
				// 			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, clip, headcircle, [-9,-8]);
				// 			group.addChild(clip);
				// 		},
				// 		callbackThisObj : this
				// 	});
				// }

				let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_lv`, [unit.toString()]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, levelTxt, headbg, [0,7]);
				group.addChild(levelTxt);

				App.DisplayUtil.setLayoutPosition(poscfg.layout, group, bigbg, poscfg.dis);

				if(poscfg.arrowx){
					let arrow = BaseBitmap.create(`studyatk_arrow`);
					arrow.anchorOffsetX = arrow.width / 2;
					arrow.anchorOffsetY = arrow.height / 2;
					arrow.setScale(0.6);
					arrow.x = group.x + poscfg.arrowx;
					arrow.y = group.y + poscfg.arrowy;

					arrow.rotation = poscfg.rotaion;
					view.addChild(arrow);
				}
			}
		}
		else{
			tipTxt.text = LanguageManager.getlocal(`acRechargeBoxSpHeadTitleTip2`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, topbg);
			let ishead = tcfg.isTitle == 2;
			let headbg = BaseBitmap.create(`battlepassrewardbg${ishead ? 2 : 1}`);
			view.addChild(headbg);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headbg, bigbg);

			let jsonData = RES.getRes(`head_4037_effect`);
			console.log(jsonData);
			let headcircle = ishead ? App.CommonUtil.getHeadPic(tcfg.id, 1, null, true, 8) : App.CommonUtil.getTitlePic(tcfg.id, 1);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, headcircle, headbg, [0,ishead?5:50]);
			view.addChild(headcircle);
		}

        return view;
    }

    protected getResourceList():string[]
	{
        let arr:string[] = [];
        arr = [
            "studyatk_arrow", "battlepassrewardbg1", "battlepassrewardbg2"
        ];
        return arr;
    }

    protected getParent():egret.DisplayObjectContainer
	{
		return null;
    }

    public dispose():void{
        super.dispose();
    }
}