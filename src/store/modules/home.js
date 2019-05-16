import {api} from '../api';
import { post, get } from '../ajax';
import ProjectConfig from '../../project-config';
import Platform from '../../platform';
import { storage } from "../../js/common";

const state = {
	currentLocation: {
		xAxes: null,
		yAxes: null,
		listData: null
	}
};

const getters = {

};

const actions = {
	// getToken
};

const mutations = {
	updataLoction: (state, res) => {

	}
};

export default {
	state,
	getters,
	actions,
	mutations
}
