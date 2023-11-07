<script setup>
import Companies from "@/views/pages/companies/Companies.vue";
import { onMounted, ref, watch } from "vue";
import axios from "../axios-order";

const companies = ref([]);
const showEditModal = ref(false);
const isNewCompany = ref(false);
const selectedCompany = ref(null);
const page = ref(1);
const pageCount = ref(0);
const valid = ref(false);

watch(page, (newPage, oldPage) => {
  fetchCompanies(newPage);
});

const fetchCompanies = (newPage = page) => {
  axios
    .get(`/companies?page=${newPage}`)
    .then((response) => {
      companies.value = response.data.data.map((company, _i) => {
        company.logo_url = `/storage/${company.logo}`;

        return company;
      });
      page.value = response.data.current_page;
      pageCount.value = Math.ceil(response.data.total / response.data.per_page);
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  fetchCompanies();
});

const openEditModal = (company) => {
  isNewCompany.value = false;
  selectedCompany.value = {
    id: company.id,
    name: company.name,
    email: company.email,
    logo: null,
    oldLogo: company.logo,
    website: [company.website],
  };
  showEditModal.value = true;
};

const saveEditedCompany = () => {
  if (valid.value === true) {
    if (isNewCompany.value === true) {
      //When add new company
      let formData = new FormData();

      formData.append("name", selectedCompany.value.name);
      formData.append("email", selectedCompany.value.email);
      if (selectedCompany.value.logo !== null) {
        formData.append("logo", selectedCompany.value.logo[0]);
      }
      formData.append("website", selectedCompany.value.website);
      axios
        .post("/companies", formData)
        .then((response) => {
          fetchCompanies();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //When save edited company
      let formData = new FormData();

      formData.append("name", selectedCompany.value.name);
      formData.append("email", selectedCompany.value.email);
      if (selectedCompany.value.logo !== null) {
        formData.append("logo", selectedCompany.value.logo[0]);
      }
      formData.append("website", selectedCompany.value.website);
      axios
        .post(`/companies/${selectedCompany.value.id}?_method=PUT`, formData)
        .then((response) => {
          fetchCompanies();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    showEditModal.value = false;

    console.log(selectedCompany.value);
  }
};

const removeCompany = (companyId) => {
  axios
    .delete(`/companies/${selectedCompany.value.id}`)
    .then((response) => {
      fetchCompanies();
    })
    .catch((error) => {
      console.log(error);
    });
};

const addCompany = () => {
  isNewCompany.value = true;
  selectedCompany.value = {
    name: "",
    email: "",
    logo: null,
    website: "",
  };
  showEditModal.value = true;
};
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => v.length <= 50 || "Name must be less than 50 characters",
];
const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];
const logoRules = [];
const websiteRules = [
  (v) => !!v || "Website is required",
  (v) =>
    /^https?:\/\/.+/.test(v) || "Website must start with http:// or https://",
];
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Basic">
        <VTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Logo</th>
              <th>Website</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="company in companies" :key="company.id">
              <td>{{ company.name }}</td>
              <td>{{ company.email }}</td>
              <td>
                <v-avatar :image="company.logo_url"> </v-avatar>
              </td>
              <td>{{ company.website }}</td>
              <td>
                <VBtn color="primary" @click="openEditModal(company)"
                  >Edit</VBtn
                >
                <VBtn color="error" @click="removeCompany(company.id)"
                  >Remove</VBtn
                >
              </td>
            </tr>
          </tbody>
        </VTable>

        <v-card-actions>
          <v-pagination v-model="page" :length="pageCount"></v-pagination>
          <v-btn
            text="Add"
            variant="tonal"
            color="info"
            @click="addCompany()"
          ></v-btn>
        </v-card-actions>
      </VCard>
    </VCol>
  </VRow>

  <v-dialog width="500" v-model="showEditModal">
    <v-card title="Dialog">
      <v-form
        ref="editForm"
        @submit.prevent="saveEditedCompany"
        v-model="valid"
      >
        <v-card-text>
          <v-text-field
            class="mt-2"
            v-model="selectedCompany.name"
            :rules="nameRules"
            label="Name"
          ></v-text-field>
          <v-text-field
            class="mt-2"
            v-model="selectedCompany.email"
            :rules="emailRules"
            label="Email"
          ></v-text-field>
          <v-file-input
            class="mt-2"
            v-model="selectedCompany.logo"
            :rules="logoRules"
            label="Upload Logo"
            accept="image/*"
          ></v-file-input>
          <v-text-field
            class="mt-2"
            v-model="selectedCompany.website"
            :rules="websiteRules"
            label="website"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Save" type="submit"></v-btn>
          <v-btn text="Cancel" @click="showEditModal = false"></v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {
    Companies,
  },
  setup() {
    return {
      companies,
      showEditModal,
      selectedCompany,
      openEditModal,
      saveEditedCompany,
      removeCompany,
      addCompany,
    };
  },
};
</script>
