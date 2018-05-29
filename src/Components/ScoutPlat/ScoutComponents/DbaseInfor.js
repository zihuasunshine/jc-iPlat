import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Card, List, Button, Modal,Table } from 'antd';

//引入自定义组件
import { httpAjax, addressUrl } from '../../../Util/httpAjax';
import AddCBA from '../AddCBA/index';
import RecordInfor from './RecordInfor'; // 笔录信息
import ContrastInfo from './ContrastInfo'; // 对比信息
import '../../../styles/scoutPlat.less';
export default class DbaseInfor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			detailSource: '',
			visible: false,
			noTitleKey: 'bary' // 默认显示第一个“办案人员”
		}
	}

	componentWillMount() {
		const ajbh = sessionStorage.getItem("ajbh");
		const reqUrl = addressUrl + `/cases/detail?ajbh=${ajbh}`;
		httpAjax("get", reqUrl).then(res => {
			if (res.code === '200') {
				this.setState({ detailSource: res.data && res.data })
			}
		})
	}
	addCBA = () => {
		this.setState({ visible: true })
	}
	handleCancel = () => {
		this.setState({ visible: false })
	}

	onTabChange = (key, type) => {
		console.log(key, type);
		this.setState({ [type]: key });
	}
	render() {
		const { visible } = this.state;
		const casesVO = this.state.detailSource && this.state.detailSource.casesVO;
		const lsCasesSuspectVO = this.state.detailSource && this.state.detailSource.lsCasesSuspectVO;
		const lsCasesInformantVO = this.state.detailSource && this.state.detailSource.lsCasesInformantVO;
		const lsCasesGoodsVO = this.state.detailSource && this.state.detailSource.lsCasesGoodsVO;
		const lsSceneVO = this.state.detailSource && this.state.detailSource.lsSceneVO;
		const lsCasesRecordVO = this.state.detailSource && this.state.detailSource.lsCasesRecordVO;
		const lsSceneFingerPrintVO = this.state.detailSource && this.state.detailSource.lsSceneFingerPrintVO;
		const lsSceneFootPrintVO = this.state.detailSource && this.state.detailSource.lsSceneFootPrintVO;

		// 改显示模式
		const tabListNoTitle = [{
			key: 'bary',
			tab: '办案人员',
		}, {
			key: 'sary',
			tab: '涉案人员',
		}
		, {
			key: 'sawp',
			tab: '涉案物品',
		}, {
			key: 'xckc',
			tab: '现场勘查',
		}, {
			key: 'xckctp',
			tab: '现场勘查图片',
		}, {
			key: 'sy',
			tab: '手印',
		}, {
			key: 'zj',
			tab: '足迹',
		}, {
			key: 'blxx',
			tab: '笔录信息',
		}, {
			key: 'dbxx',
			tab: '比中信息',
		}];

	    // 模拟数据
		let temp = {
			d_xyr: [
				{ xm: "张三", xbCn: "男", csrq: '2018-01-01', hjdz: '深圳市龙岗区', lxdh: '13312345678' },
				{ xm: "李四", xbCn: "女", csrq: '1918-01-01', hjdz: '深圳市保安区', lxdh: '13312345678' }
			],
			d_shr: [
				{ rylxCn: "报案人", xm: "王五五", xbCn: "男", csrq: '2018-01-01', hjdz: '深圳市龙岗区三联村委', lxdh: '13312345678' },
				{ rylxCn: "受害人", xm: "赵柳", xbCn: "男", csrq: '1818-01-01', hjdz: '深圳市龙岗区宝岗派出所吉祥花园11栋', lxdh: '13312345678' },
				{ rylxCn: "受害人", xm: "王久", xbCn: "女", csrq: '1918-01-01', hjdz: '深圳市保安区', lxdh: '13312345678' }
			],
			d_sawp: [
				{ wpmcCn: "现金2000w", wpsz: "王五五", wplbCn: "现金"},
				{ wpmcCn: "笔记本电脑", wpsz: "赵柳", wplbCn: "数码产品"  },
				{ wpmcCn: "苹果手机1部", wpsz: "王久", wplbCn: "数码产品"  }
			],
			d_zj: [
				{ ylbw: "走廊", tqrq: "2018-6-5"},
				{ ylbw: "门", tqrq: "2018-6-5"  },
				{ ylbw: "窗", tqrq: "2018-6-5"   }
			], 
			d_sy: [
				{ ylbw: "走廊", tqrq: "2018-6-5"},
				{ ylbw: "窗", tqrq: "2018-6-5"   }
			], 
			d_xckc:[
				{ kyjcry: "张三", kydd: "宝钢派出所1", kysjks: "2018-12-11",kysjjs: "2018-05-11 09:00:00", kyjcqk: "宝钢派出所记录很多内容" },
				{ kyjcry: "李四", kydd: "宝钢派出所2", kysjks: "2018-10-11",kysjjs: "2018-06-11", kyjcqk: "宝钢派出所记录很多内容2" },
				{ kyjcry: "王五", kydd: "宝钢派出所3", kysjks: "2018-09-11",kysjjs: "2018-07-11",kyjcqk: "宝钢派出所记录很多内容3" },
				{ kyjcry: "张柳", kydd: "宝钢派出所4", kysjks: "2018-04-11",kysjjs: "2018-08-11", kyjcqk: "宝钢派出所记录很多内容4" }
			] 
		}
		// 涉案物品
		const sawp_columns= [{
			title: '序号',
			align:"center",
			dataIndex: 'name',
			render: (text, record, index) =>{ 
				return <a href="javascript:;">{index+1}</a>
			} 
		  }, {
			title: '失主',
			align:"center",
			className: 'column-money',
			dataIndex: 'wpsz',
		  }, {
			title: '物品名称',
			className: 'column-money',
			dataIndex: 'wpmcCn',
		  }, {
			title: '物品类别',
			dataIndex: 'wplbCn',
		  }];

		// 手印
		const sy_columns= [{
			title: '序号',
			align:"center",
			dataIndex: 'name',
			render: (text, record, index) =>{ 
				return <a href="javascript:;">{index+1}</a>
			} 
		  }, {
			title: '提取部位',
			align:"center",
			className: 'column-money',
			dataIndex: 'ylbw',
		  }, {
			title: '提取日期',
			align:"center",
			className: 'column-money',
			dataIndex: 'tqrq',
		  }];

		// 足迹
		const zj_columns= [{
			title: '序号',
			align:"center",
			dataIndex: 'name',
			render: (text, record, index) =>{ 
				return <a href="javascript:;">{index+1}</a>
			} 
		  }, {
			title: '提取部位',
			align:"center",
			className: 'column-money',
			dataIndex: 'ylbw',
		  }, {
			title: '提取日期',
			align:"center",
			className: 'column-money',
			dataIndex: 'tqrq',
		  }];

		 // 切换的tabs
		  const contentListNoTitle = {
			// 办案人员
			bary: <Card style={{ marginBottom: '10px' }} bordered={false} >
				<Card.Grid style={{ width: '20%' }}>主办人员</Card.Grid>
				<Card.Grid style={{ width: '20%' }}>{casesVO.ajzbryCn || ''}</Card.Grid>
				<Card.Grid style={{ width: '20%' }}>协办人员</Card.Grid>
				<Card.Grid style={{ width: '40%' }}>
					{casesVO.ajxbryCn && typeof (casesVO.ajxbryCn) == 'object' ? casesVO.ajxbryCn.join(",") : casesVO.ajxbryCn}
				</Card.Grid>
			</Card>,
			// 涉案人员
			sary: <Card style={{ marginBottom: '10px' }} bordered={false} >
				{
				  lsCasesInformantVO && lsCasesInformantVO.length >= 1||1  ?
					<List size="small"
					style={{borderBottom:"1px solid #e8e8e8"}}
					dataSource={temp.d_shr}
						renderItem={item => (
							<List.Item>{item.rylxCn}：{item.xm}　{item.xbCn}　{item.csrq}　户籍：{item.hjdz}　手机：{item.lxdh ? item.lxdh : '无'}</List.Item>
						)}
					/> : "无"
				}
				{
					lsCasesSuspectVO && lsCasesSuspectVO.length >= 1 ||1 ?
					<List size="small"
				    	style={{borderBottom:"1px solid #e8e8e8"}}
						dataSource={temp.d_xyr}
						renderItem={item => (
							<List.Item>	嫌疑人：{item.xm}　{item.xbCn}　{item.csrq}　户籍：{item.hjdz}　手机：{item.lxdh ? item.lxdh : '无'}</List.Item>
						)} />
					: ''
				}
			</Card>,
			// 涉案物品
			sawp: <Card style={{ marginBottom: '10px' }} bordered={false} >
			{/* lsCasesGoodsVO */}
			<Table	columns={sawp_columns}
				dataSource={lsCasesGoodsVO}
				bordered
				pagination={{pageSize:40}}
				title={null}
				footer={null}
			/>
			</Card>,
			// 现场勘查
			xckc: <Card style={{ marginBottom: '10px' }} bordered={false} >
				{/* lsSceneVO */}
				{lsSceneVO && lsSceneVO.map((item, index) => {
						return <Card style={{ marginBottom: 10 }}
							title={<p style={{ position: 'absolute', marginTop: 10, fontSize: 12, color: '#1890ff' }}>
								<span style={{ marginRight: 15 }}>勘查人员: {item.kyjcry || '-'}</span>
								{/*   <span style={{ marginRight: 15 }}>记录地点: {item.jldd || '-'}</span> */}
								<span style={{ marginRight: 15 }}>　地点: {item.kydd || ''}</span>
								<span style={{ marginRight: 15 }}>　开始时间: {item.kysjks || ''}</span>
								<span style={{ marginRight: 15 }}>　结束时间: {item.kysjjs || ''}</span>
							</p>}
						/*  extra={<a href="#">记录时间：{item.starttime || '-'}</a>} */
						>
							<div style={{ padding: "1px 28px" }}>勘查情况：{item.kyjcqk || '-'}</div>
						</Card>
					})
				}
				{!lsSceneVO||lsSceneVO.length==0?'暂无记录':""}
			</Card>,
			// 现场勘查图片
			xckctp: <Card style={{ marginBottom: '10px' }} className='sceneImages' bordered={false} >
				{(lsSceneVO && lsSceneVO).length >= 1 ?
					lsSceneVO.map((item, index) => {
						return <div key={index} style={{ height: '200px' }}>
							{
								item.lsSceneImageCidVO && item.lsSceneImageCidVO.map((i, dn) => {
									return <Card.Grid key={dn} style={{ padding: 0 }}>{i.lbCn}<img alt="example" src={addressUrl + `/cases/sceneImage?id=${i.id}`} /></Card.Grid>
								})
							}
						</div>
					}) : '暂无图片'
				}
			</Card>,
			// 手印
			sy: <Card style={{ marginBottom: '10px' }} bordered={false} >
			{/* lsSceneFingerPrintVO */}
		    <Table	columns={sy_columns}
				dataSource={lsSceneFingerPrintVO}
				bordered
				pagination={false}
				title={null}
				footer={null}/>
			</Card>,
			// 足迹
			zj: <Card style={{ marginBottom: '10px' }} bordered={false} >
			 {/* lsSceneFootPrintVO */}
			 <Table	columns={zj_columns}
				dataSource={lsSceneFootPrintVO}
				bordered
				pagination={false}
				title={null}
				footer={null}
			/>
			</Card>,
			// 笔录信息
			blxx: <Card style={{ marginBottom: '10px' }} bordered={false} >
				{lsCasesRecordVO && lsCasesRecordVO.length > 0||1? <RecordInfor lsCasesRecordVO={lsCasesRecordVO} /> : '暂无记录'}
			</Card>,
			// 比中信息
			dbxx: <Card style={{ marginBottom: '10px' }} bordered={false} >
				{<ContrastInfo />}
			</Card>
		};

		return (
			<div className='detailBaseInfo'>
				<div style={{ marginBottom: 10 }}>
					{casesVO.lasj}{casesVO.ajmc}
					<Button type='primary' size='small' style={{ margin: '0 10px' }} onClick={this.addCBA}>添加串并案</Button>
					<span>串并案件：{casesVO.sfcba == 1 ? casesVO.lsCasesMegerVO && casesVO.lsCasesMegerVO.map((item, index) => {
							return <span key={index}>{item.ajbh}：{item.ajmc} </span>;
						}) : '无'
					}</span>
				</div>
				<Card title="基本信息" style={{ marginBottom: '10px' }}>
					<Card.Grid >案件编号</Card.Grid>
					<Card.Grid >{casesVO.ajbh ? casesVO.ajbh : '无'}</Card.Grid>
					<Card.Grid >案件名称</Card.Grid>
					<Card.Grid >{casesVO.ajmc ? casesVO.ajmc : '无'}</Card.Grid>
					<Card.Grid >主办单位</Card.Grid>
					<Card.Grid >{casesVO.zbdwCn ? casesVO.zbdwCn : '无'}</Card.Grid>
					<Card.Grid >发案开始时间</Card.Grid>
					<Card.Grid >{casesVO.fasjcz ? casesVO.fasjcz : '无'}</Card.Grid>
					<Card.Grid >发案结束时间</Card.Grid>
					<Card.Grid >{casesVO.fasjzz ? casesVO.fasjzz : '无'}</Card.Grid>
					<Card.Grid >发案地点</Card.Grid>
					<Card.Grid >{casesVO.fadd ? casesVO.fadd : '无'}</Card.Grid>
					<Card.Grid >发案地域</Card.Grid>
					<Card.Grid >{casesVO.fadyCn ? casesVO.fadyCn : '无'}</Card.Grid>
					<Card.Grid >案件状态</Card.Grid>
					<Card.Grid >{casesVO.bdajstateCn ? casesVO.bdajstateCn : '无'}</Card.Grid>
					<Card.Grid >受理单位</Card.Grid>
					<Card.Grid >{casesVO.sljsdwCn ? casesVO.sljsdwCn : '无'}</Card.Grid>
					<Card.Grid >报警时间</Card.Grid>
					<Card.Grid >{casesVO.sljjsj ? casesVO.sljjsj : '无 '}</Card.Grid>
					<Card.Grid >接处警编号</Card.Grid>
					<Card.Grid >{casesVO.sljsdw ? casesVO.sljsdw : '无'}</Card.Grid>
					<Card.Grid >报警方式</Card.Grid>
					<Card.Grid >{casesVO.slJjfsCn ? casesVO.slJjfsCn : '无'}</Card.Grid>
					<Card.Grid >作案状态</Card.Grid>
					<Card.Grid >{casesVO.zaztCn ? casesVO.zaztCn : '无'}</Card.Grid>
					<Card.Grid >案别</Card.Grid>
					<Card.Grid >{casesVO.abCn ? casesVO.abCn : '无'}</Card.Grid>
					<Card.Grid >专案标识</Card.Grid>
					<Card.Grid >{casesVO.zabzCn ? casesVO.zabzCn : '无'}</Card.Grid>
					<Card.Grid >案件来源</Card.Grid>
					<Card.Grid >{casesVO.ajFromCn ? casesVO.ajFromCn : '无'}</Card.Grid>
					<Card.Grid >立案人员</Card.Grid>
					<Card.Grid >{casesVO.ajlaryCn ? casesVO.ajlaryCn : '无'}</Card.Grid>
					<Card.Grid >案件危害程度</Card.Grid>
					<Card.Grid >{casesVO.ajwhcdCn ? casesVO.ajwhcdCn : '无'}</Card.Grid>
					<Card.Grid >案件所属警区</Card.Grid>
					<Card.Grid >{casesVO.ajssjqCn ? casesVO.ajssjqCn : '无'}</Card.Grid>
					<Card.Grid >所属社区</Card.Grid>
					<Card.Grid >{casesVO.sssqCn ? casesVO.sssqCn : '无'}</Card.Grid>
					<Card.Grid >选择部位</Card.Grid>
					<Card.Grid >{casesVO.xzbwCn ? casesVO.xzbwCn : '无'}</Card.Grid>
					<Card.Grid >选择处所</Card.Grid>
					<Card.Grid >{casesVO.xzcsCn ? casesVO.xzcsCn : '无'}</Card.Grid>
					<Card.Grid >选择对象</Card.Grid>
					<Card.Grid >{casesVO.xzdxCn ? casesVO.xzdxCn : '无'}</Card.Grid>
					<Card.Grid >选择时间</Card.Grid>
					<Card.Grid >{casesVO.xzsjCn ? casesVO.xzsjCn : '无'}</Card.Grid>
					<Card.Grid >选择物品</Card.Grid>
					<Card.Grid >{casesVO.xzwpCn ? casesVO.xzwpCn : '无'}</Card.Grid>
					<Card.Grid >作案工具</Card.Grid>
					<Card.Grid >{casesVO.zagjCn ? casesVO.zagjCn : '无'}</Card.Grid>
					<Card.Grid >作案状态</Card.Grid>
					<Card.Grid >{casesVO.zaztCn ? casesVO.zaztCn : '无'}</Card.Grid>
					<Card.Grid >作案人数</Card.Grid>
					<Card.Grid >{casesVO.zars ? casesVO.zars : '无'}</Card.Grid>
					<Card.Grid >发现形式</Card.Grid>
					<Card.Grid >{casesVO.fxxsCn ? casesVO.fxxsCn : '无'}</Card.Grid>
					<Card.Grid >发案地点区县</Card.Grid>
					<Card.Grid >{casesVO.faddQxCn ? casesVO.faddQxCn : '无'}</Card.Grid>
					<Card.Grid >发案地点街道</Card.Grid>
					<Card.Grid >{casesVO.faddJdCn ? casesVO.faddJdCn : '无'}</Card.Grid>
					<Card.Grid >督办级别</Card.Grid>
					<Card.Grid >{casesVO.dbjbCn ? casesVO.dbjbCn : '无'}</Card.Grid>
					<Card.Grid >是否涉外</Card.Grid>
					<Card.Grid >{casesVO.sfswCn ? casesVO.sfswCn : '无'}</Card.Grid>
					<Card.Grid >手段特点</Card.Grid>
					<Card.Grid >{casesVO.sdtdCn ? casesVO.sdtdCn : '无'}</Card.Grid>
					<Card.Grid >死亡人数</Card.Grid>
					<Card.Grid >{casesVO.swrs ? casesVO.swrs : '无'}</Card.Grid>
					<Card.Grid >&nbsp;</Card.Grid>
					<Card.Grid >&nbsp;</Card.Grid>
					<Card.Grid style={{ width: '16%' }}>主要案情</Card.Grid>
					<Card.Grid style={{ width: '80%' }} title={casesVO.zyaq || ''}>{casesVO.zyaq ? casesVO.zyaq : '无'}</Card.Grid>
				</Card>
				<Card style={{ width: '100%', marginBottom: 30 }} tabList={tabListNoTitle}
					activeTabKey={this.state.noTitleKey}
					onTabChange={(key) => { this.onTabChange(key, 'noTitleKey'); }}>
				 <div style={{padding:"5px 35px"}}>	{contentListNoTitle[this.state.noTitleKey]} </div>
				</Card>
				{/* 添加串并案 */}
				<Modal visible={visible} title='添加串并案' onCancel={this.handleCancel} className='extractCaseM' footer={false}>
					{/* <AddCBA handleCancel={this.handleCancel} showType='addCBA' /> */}
				</Modal>
			</div>
		)
	}
}