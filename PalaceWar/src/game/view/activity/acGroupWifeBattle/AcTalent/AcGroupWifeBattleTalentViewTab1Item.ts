//风华群芳--提升才情tab1 item
class AcGroupWifeBattleTalentViewTab1Item extends ScrollListItem
{
	public constructor() {
		super();
	}

	protected initItem(index:number,data:any)
    {
		this.width = 604;
        this.height = 60;
        let rankImg = BaseBitmap.create("acgroupwifebattle_itembg1")
        rankImg.width = this.width;
        rankImg.height = 60;
        this.addChild(rankImg);

        let rankTxt:BaseTextField;

        // if (index < 3)
        // {
        //     let rankImg = BaseBitmap.create("rank_"+String(index+1))
        //     rankImg.x = 72-rankImg.width/2;
        //     rankImg.y = this.height/2 - rankImg.height/2;
        //     this.addChild(rankImg);
        // }else
        // {
			//  let rankImg = BaseBitmap.create("dinner_rankbg")
            // rankImg.x = 62-rankImg.width/2;
            // rankImg.y = this.height/2 - rankImg.height/2;
            // this.addChild(rankImg);

            rankTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
            rankTxt.text = String(index+1);
            rankTxt.x = 100 - rankTxt.width/2;
            rankTxt.y = rankImg.height*rankImg.scaleY/2 - rankTxt.height/2;
            this.addChild(rankTxt);
        // }
       

        let nameTxt = ComponentManager.getTextField(data.num,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		nameTxt.x = 247 - nameTxt.width/2
        nameTxt.y =  rankImg.height*rankImg.scaleY/2 - nameTxt.height/2;;
        this.addChild(nameTxt);

		let scoreTxt = ComponentManager.getTextField((data.effect).toFixed(0)+"%",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		scoreTxt.x = 430 - scoreTxt.width/2
        scoreTxt.y =  rankImg.height*rankImg.scaleY/2 - nameTxt.height/2;
        this.addChild(scoreTxt);
        
        if (data.isused) {
            scoreTxt.textColor = TextFieldConst.COLOR_WARN_GREEN2;
            let add:number = 0;
            if(Api.wifebattleVoApi.wifebattleVo.info && Api.wifebattleVoApi.wifebattleVo.info.tmpattr && Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd){
                add = Api.wifebattleVoApi.wifebattleVo.info.tmpattr.statusadd;
            }
            if(add == data.effect){
                rankImg.setRes(`acgroupwifebattle_itembg2`);
                let arrow  = BaseBitmap.create(`wifeview_artistryicon`);
                arrow.x = 30;
                arrow.y = rankImg.y + rankImg.height/2 - arrow.height/2;
                this.addChild(arrow);
            }
        }

        
        // let lineImg = BaseBitmap.create("public_line1");
        // lineImg.width = this.width;
        // lineImg.x = 0;
        // lineImg.y = this.height - lineImg.height;
        // this.addChild(lineImg);


	}

	public dispose():void
    {
        super.dispose();
    }
}