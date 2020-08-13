/**
 * 出站阵容item
 * date 2020.7.6
 */
class SixSection1BattleFormationScrollItem extends ScrollListItem{

    public constructor(){
        super();
    }
    
    public initItem(index:number, data:any, param?:any){
        let sid = data;
        let servantInfoVo : ServantInfoVo = Api.servantVoApi.getServantObj(sid);
        let temW:number = 105;
		let iconBgBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.qualityBoxImgPath : 'servant_cardbg_0');
		this.addChild(iconBgBt);
		iconBgBt.scaleX = temW/194;
        iconBgBt.scaleY = temW/192;

		let iconBt:BaseLoadBitmap = BaseLoadBitmap.create(servantInfoVo ? servantInfoVo.halfImgPath : 'servant_half_empty');
		iconBt.x = iconBgBt.x + 5;
		iconBt.y = iconBgBt.y + 5;
		this.addChild(iconBt);
		iconBt.scaleX = (temW-10)/180;
        iconBt.scaleY = (temW-10)/177;

        //兵力数目
        let numbg:BaseBitmap = BaseBitmap.create("servant_namebg");
        numbg.width = 98;
        numbg.height = 24;
        numbg.setPosition(3, 77);
        this.addChild(numbg);
        
        let zizhistr = LanguageManager.getlocal("emperorWarBuzhenZzhi",[String(servantInfoVo.getTotalBookValue(1))]);
        let zizhiText = ComponentManager.getTextField(zizhistr, 18,TextFieldConst.COLOR_WHITE);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,zizhiText,numbg);
        this.addChild(zizhiText);
        
        this.width = temW + this.getSpaceX();
        this.height = temW + this.getSpaceY();

    }

    public getSpaceX():number{
        return 15;
    }

    public getSpaceY():number{
        return 12;
    }

    public dispose():void{

        super.dispose();
    }
}