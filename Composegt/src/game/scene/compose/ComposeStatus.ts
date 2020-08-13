namespace ComposeStatus
{
	//NetManager.request("map.testunlockgroup",groupid:90); 测试解锁关卡
	export let renSize=new egret.Rectangle(0,0,94,134);
	export let renBigSize=new egret.Rectangle(0,0,192,260);
	export let status=ComposeEnums.NONE;
	export let curStopPos:{x:number,y:number}={x:-1,y:-1};
	export let curSelectPos:{x:number,y:number}={x:-1,y:-1};
	export let targetList:{[key:string]:{x:number,y:number,lv:number}}={};
	export let delId:string;
	export let startX:number=56 + 45-73+47;//732-182;
	export let startY:number=395+23-74+70;//722-368-92;
	export let cellCfg={w:146,h:148};//{w:90,h:46,spaceX:56,spaceY:102};
	export let cellBgSize={w:90,h:46};
	export let angle:number = Math.atan2(cellCfg.h,cellCfg.w)*180/Math.PI;
	export let mapSize={w:1808,h:1750};
	export let buyNum:number=0;
	export let isBatchMoving:boolean=false;
	export let isBuyStop:boolean=false;

	/**每秒移动像素距离 */
	export let moveSpeed=20;
	let moveRangle:{x:number,y:number,w:number,h:number}=null;
	// export let isComposeing:boolean=false;

	// export function getDataById(id:string):ComposemapItemVo
	// {
	// 	return Api.composemapVoApi.getCellDataById(id);
	// }

	// export function getLeftTopPixByPos(x:number,y:number):{pixX:number,pixY:number}
	// {
	// 	let {pixX,pixY}=getPixPosByCellPos(x,y);
	// 	return {pixX:pixX-cellCfg.w*0.5,pixY:pixY-cellCfg.h*0.5};
	// }

	/**
	 * 获取当前地块最大坐标，不能删
	 * @param x 
	 * @param y 
	 */
	export function getRightButtomPixByPos(x:number,y:number):{pixX:number,pixY:number}
	{
		let {pixX,pixY}=getPixPosByCellPos(x,y);
		return {pixX:pixX+cellCfg.w*0.5,pixY:pixY+cellCfg.h*0.5};
	}

	export function getPixPosByCellPos(x:number,y:number):{pixX:number,pixY:number}
	{
		let pixX:number = startX + x*(cellCfg.w)+cellCfg.w*0.5-47;
		let pixY:number = startY + y*(cellCfg.h)+cellCfg.h*0.5-70;
		return {pixX:pixX,pixY:pixY};
	}

	/**
	 * 漫游矩形区域大小和位置
	 */
	export function getMoveRangle():{x:number,y:number,w:number,h:number}
	{
		if(!moveRangle)
		{
			let maxXY=Config.MapinfoCfg.maxXY;
			let w=maxXY.x*(cellCfg.w)+cellCfg.w*0.5;
			let h=maxXY.y*(cellCfg.h)+cellCfg.h*0.5;
			moveRangle={x:startX,y:startY,w:w,h:h};
		}

		return moveRangle;
	}

	export function checkBound(pixX:number,pixY:number):{pixX:number,pixY:number}
	{
		let rect=getMoveRangle();
		return {pixX:Math.min(rect.x+rect.w,Math.max(rect.x,pixX)),pixY:Math.min(rect.y+rect.h,Math.max(rect.y,pixY))};
	}

	/**
	 * 获取随机位置
	 */
	export function getRandomPos():{pixX:number,pixY:number}
	{
		let rect=getMoveRangle();
		let randValueX=Math.random()*rect.w;
		let randValueY=Math.random()*rect.h;
		return {pixX:rect.x+randValueX,pixY:rect.y+randValueY};
	}

	export function resetStatus():void
	{
		status=ComposeEnums.NONE;
	}

	export function getCellPosByPixPos(pixX:number,pixY:number):{x:number,y:number}
	{
		let x:number=-1,y:number=-1;
		pixX=pixX-startX;
		pixY=pixY-startY;

		let offX=pixX/(cellCfg.w);
		let offY=pixY/(cellCfg.h);
		offX=offX<0?Math.floor(offX):Math.floor(offX);
		offY=offY<0?Math.floor(offY):Math.floor(offY);
		return {x:offX,y:offY};
	}

	export function clear():void
	{
		status=ComposeEnums.NONE;
		curStopPos={x:-1,y:-1};
		curSelectPos={x:-1,y:-1};
		targetList={};
		delId=null;
		buyNum=0;
		isBatchMoving=false;
		isBuyStop=false;
		// isComposeing = false
	}
}