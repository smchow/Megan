Vue.use(Vuex);

var model = {
  namespaced: true,
  state: {
  },

  mutations: {
  }
};

var store = new Vuex.Store({
  state: {
    forms: [
        {
          name: 'contactInfo',
          title: 'Contact Information'
        },
        {
          name: 'member',
          title: 'Household'
        },
        {
          name: 'finances',
          title: 'Finances'
        },
        {
          name: 'creditHistory',
          title: 'Credit History'
        },
        {
          name: 'driversLicense',
          title: 'Drivers License'
        }
    ],

    applications: [
      {
        application: "AffordableHousing_Application sales-Fields.pdf",
        name: "affordableHousingApplication",
        label: "Affordable Housing Application",
        selected: false
      },
      {
        application: "Application-GF-Fields.pdf",
        name: "applicationGF",
        label: "Application GF",
        selected: false
      },
      {
        application: "Application-PCV-Fields.pdf",
        name: 'applicationPCV',
        label: 'Application PCV',
        selected: false
      },
      {
        application: "Avalon Princeton - Preliminary Application Rev-Mar-2016-Fields.pdf",
        name: 'avalonPrinceton',
        label: 'Avalon Princeton',
        selected: false
      }
    ],

    fields: [],

    activeFields: []
  },

  getters: {
    fields: (state, getters) => (form) => {
      var isInForm = (field) =>
        field.form === form.name;
      
      var fields = state.activeFields.filter(isInForm);

      return fields;
    }
  },

  mutations: {
    setFields(state, payload){
      state.fields = payload;
    },

    updateField(state, { field, value }){
      var field = state.fields.find( a => a.name === field );
      field.value = value;
    },

    updateApplication(state, applicationName){
      var application = state.applications.find(
        a => a.name === applicationName
      );

      application.selected = !application.selected;
    },

    updateActiveFields(state){
      var isActiveApplication = (name) => {
        var is = state.applications.find(
          (a) => a.application === name
        ).selected;

        return is;
      }

      var isInActiveApplication = (field) => 
        field.requiredBy.some(isActiveApplication);

      var activeFields = state.fields.filter(isInActiveApplication);

      state.activeFields = activeFields;

      state.activeFields = state.fields;
    }
  },

  actions: {
    updateApplicationSelections({ state, commit }, applicationName){
      //update selection
      commit('updateApplication', applicationName);
          //update
      commit('updateActiveFields');
    },

    fetchFields({ commit }){
      var setFields = (response) =>
        new Promise( (resolve, reject) => {
          var data = response.data;
          commit('setFields', data);
          resolve(data);
        }

      var updateActiveFields = (

      axios.get('/json/application-fields.json')
      .then(setFields)
      .then(updateActiveFields);
    }
  }
});
