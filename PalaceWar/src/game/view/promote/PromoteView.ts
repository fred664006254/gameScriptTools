/**
 * 军机处分封
 * author qianjun
 */
class PromoteView extends CommonView {
    public constructor() {
		super();
    }

    private _roleInfoItem1 : PromoteRoleItem = null;
    private _roleInfoItem2 : PromoteRoleItem = null;
    private _roleInfoItem3 : PromoteRoleItem = null;
    private _roleInfoItem4 : PromoteRoleItem = null;
    private _roleInfoItem5 : PromoteRoleItem = null;
    private _roleInfoItem6 : PromoteRoleItem = null;
    private _roleInfoItem7 : PromoteRoleItem = null;
    private _pos : any = {};

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "promotebg","promotefnt","promotejzhou","promotenamebg","promoteszhibg",
            "promotetitle1","promotetitle2","promotetitle3","promotetitle4","promotetitle5","promotetitle6","promotetitle7",
            "promoteclothtype1","promoteclothtype2","promoteclothtype3","promoteclothtype4","promoteclothtype5","promoteclothtype6","promoteclothtype7","promoteclothtype7_head1","promoteclothtype7_head2","palace_role_shadow"
        ]);
    }

    private get api(){
        return Api.promoteVoApi;
    }

    private get cfg(){
        return Config.PromoteCfg;
    }

    // protected getRequestData():{requestType:string,requestData:any}{
	// 	return {requestType:NetRequestConst.REQUEST_MODEL_PROMOTE,requestData:{}};
    // }

    // //请求回调
	// protected receiveData(data: { ret: boolean, data: any }): void {
    //     let view = this;
    //     let cmd = data.data.cmd;
    //     if(cmd == NetRequestConst.REQUEST_MODEL_PROMOTE){
    //         if (data.data.data)
    //         {
    //             view.api.formatData(data.data.data);
    //             view.freshRole();
    //         }
    //     }
    // }

    private getPromoteList(evt : egret.Event):void{
        let view = this;
        if (evt && evt.data && evt.data.ret){
            view.api.initListData(evt.data.data.data);
            // view.freshRole();
        }
        view.freshRole();
    }
    // 背景图名称
	protected getBgName():string
	{
		return "promotebg";
    }

    private sendMsg():void{
        let view = this;
        view.freshRole();
        //NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX, {});
    }

    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseBitmap.create(bgName);
			if(bgName=="commonview_bg1"&&(this.viewBg instanceof BaseBitmap))
			{
				this.viewBg.fillMode=egret.BitmapFillMode.REPEAT;
			}
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
            }
            this.viewBg.width = GameConfig.stageWidth;
            this.addChild(this.viewBg);
            this.height = GameConfig.stageHeigth;
            this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this);
            
            // this.viewBg.height = GameConfig.stageHeigth;
            
		}
	}
    /**
     * 军机大臣
大将军  大学士
提督  总督  尚书
    */
    protected initView():void{
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), view.getPromoteList, view);
        NetManager.request(NetRequestConst.REQUEST_PROMOTE_INDEX, {});
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_PROMOTE_SUCCESS, view.sendMsg, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CANCEL_SUCCESS, view.sendMsg, view);
        view._pos = [
            {"type" : 6, "LayoutConst" : LayoutConst.horizontalCenterbottom, "distance" : [0,60], "scale" : 0.5, "index" : 3},
            {"type" : 4, "LayoutConst" : LayoutConst.leftbottom, "distance" : [0,60], "scale" : 0.5, "index" : 2},
            {"type" : 3, "LayoutConst" : LayoutConst.rightbottom, "distance" : [0,60], "scale" : 0.5, "index" : 4},
            {"type" : 2, "LayoutConst" : LayoutConst.leftbottom, "distance" : ['0.5_-40','1_2'], "scale" : 0.36, "root" : "4", "index" : 5},
            {"type" : 5, "LayoutConst" : LayoutConst.rightbottom, "distance" : ['0.5_40','1_2'], "scale" : 0.36, "root" : "3", "index" : 6},
            {"type" : 1, "LayoutConst" : LayoutConst.horizontalCenterbottom, "distance" : ['0_0','1_166'], "scale" : 0.3, "root" : "6", "index" : 1},
            {"type" : 7, "LayoutConst" : LayoutConst.leftbottom, "distance" : ['0.5_0','1_-60'], "scale" : 0.22, "root" : "5", "index" : 7},
        ];
        /*{
            "1" : {"LayoutConst" : LayoutConst.horizontalCenterbottom, "distance" : [0,60], "scale" : 0.5},
            "2" : {"LayoutConst" : LayoutConst.leftbottom, "distance" : [24,60], "scale" : 0.5},
            "3" : {"LayoutConst" : LayoutConst.rightbottom, "distance" : [24,60], "scale" : 0.5},
            "4" : {"LayoutConst" : LayoutConst.leftbottom, "distance" : ['0.5','1_2'], "scale" : 0.36, "root" : "2"},
            "5" : {"LayoutConst" : LayoutConst.rightbottom, "distance" : ['0.5','1_2'], "scale" : 0.36, "root" : "3"},
            "6" : {"LayoutConst" : LayoutConst.horizontalCenterbottom, "distance" : ['0_0','1_166'], "scale" : 0.3, "root" : "1"},
            "7" : {"LayoutConst" : LayoutConst.leftbottom, "distance" : ['0.5_0','1_-40'], "scale" : 0.22, "root" : "5"},
        };*/
    }

    private freshRole():void{
        let view = this;
        //7位大臣
        let promoteList = view.api.getPromoteList();
        let pos = view._pos;
        //{uid = 10001,vip = 1,level =3,pic = 4,name = "aa"}
        for(let i in pos){
            let posInfo = pos[i];
            let promoteCfg = view.cfg.positionList[posInfo.type - 1];
            let promotetype = Number(posInfo.type); 
            
            let unit = promoteList[promotetype];
            let infovo = new PalaceRoleInfoVo();
            if(unit){
                unit.promotetype = promoteCfg.type;
            }
            else{
                unit = {
                    'promotetype' : promoteCfg.type
                };
            }
            
            infovo.initData(unit);

            if(view[`_roleInfoItem${promotetype}`]){
                view[`_roleInfoItem${promotetype}`].refreshUIWithData(infovo);
            }
            else{
                let roleinfo : PromoteRoleItem =  new PromoteRoleItem(posInfo.scale, promoteCfg.type);
                roleinfo.refreshUIWithData(infovo);
                // if(posInfo.scale){
                //     roleinfo.setScale(posInfo.scale);
                // }
                if(posInfo.root){
                    let rootObj = view[`_roleInfoItem${posInfo.root}`];
                    let distance : string[] = posInfo.distance;
                    let x_xishu = Number(distance[0].split('_')[0]);
                    let x_anchor = Number(distance[0].split('_')[1]) || 0;
                    let y_xishu = Number(distance[1].split('_')[0]);
                    let y_anchor = Number(distance[1].split('_')[1]) || 0;
                    view.setLayoutPosition(posInfo.LayoutConst, roleinfo, rootObj, [517 * view[`_roleInfoItem${posInfo.root}`]._scale * x_xishu + x_anchor, 775 * view[`_roleInfoItem${posInfo.root}`]._scale * y_xishu + y_anchor]);
                }
                else{
                    view.setLayoutPosition(posInfo.LayoutConst, roleinfo, view.viewBg, posInfo.distance);
                }
                view.addChild(roleinfo);
                view[`_roleInfoItem${promotetype}`] = roleinfo;
            }  
            view.setChildIndex(view[`_roleInfoItem${promotetype}`], posInfo.index + 1);
        }
        view._roleInfoItem2.x = 119;
        view._roleInfoItem5.x = GameConfig.stageWidth - view._roleInfoItem5.width - 119;
        view._roleInfoItem7.x = GameConfig.stageWidth - view._roleInfoItem7.width - 55;
    }
    
    public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_INDEX), view.getPromoteList, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_PROMOTE_SUCCESS, view.sendMsg, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CANCEL_SUCCESS, view.sendMsg, view);
        for(let i = 1; i < 8; ++ i){
            view[`_roleInfoItem${i}`].removeTouchTap();
            view[`_roleInfoItem${i}`] = null;
        }
        super.dispose();
    }
}