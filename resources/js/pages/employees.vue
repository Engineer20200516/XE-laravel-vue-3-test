<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "../axios-order";

const companies = ref([]);
const employees = ref([]);
const showEditModal = ref(false);
const isNewEmployee = ref(false);
const selectedEmployee = ref(null);
const page = ref(1);
const pageCount = ref(0);
const valid = ref(false);

watch(page, (newPage, oldPage) => {
  fetchEmployees(newPage);
});

const fetchEmployees = (newPage = page) => {
  axios
    .get(`/employees?page=${newPage}`)
    .then((response) => {
      employees.value = response.data.data.map((employee, _i) => {
        employee.logo_url = `/storage/${employee.logo}`;

        return employee;
      });
      page.value = response.data.current_page;
      pageCount.value = Math.ceil(response.data.total / response.data.per_page);
    })
    .catch((error) => {
      console.error(error);
    });
};

const fetchCompanies = () => {
  axios.get(`/companies`).then((response) => {
    companies.value = response.data.data;
  });
};

onMounted(() => {
  fetchEmployees();
  fetchCompanies();
});

const openEditModal = (employee) => {
  isNewEmployee.value = false;
  selectedEmployee.value = {
    id: employee.id,
    first_name: employee.first_name,
    last_name: employee.last_name,
    company_id: employee.company.id,
    email: employee.email,
    phone: employee.phone,
  };
  showEditModal.value = true;
};

const saveEditedEmployee = () => {
  if (valid.value === true) {
    if (isNewEmployee.value === true) {
      //When add new employee
      let formData = new FormData();

      formData.append("first_name", selectedEmployee.value.first_name);
      formData.append("last_name", selectedEmployee.value.last_name);
      formData.append("email", selectedEmployee.value.email);
      if (selectedEmployee.value.company_id !== 0) {
        formData.append("company_id", selectedEmployee.value.company_id);
      }
      formData.append("phone", selectedEmployee.value.phone);
      axios
        .post("/employees", formData)
        .then((response) => {
          fetchEmployees();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //When save edited employee
      let formData = new FormData();

      formData.append("first_name", selectedEmployee.value.first_name);
      formData.append("last_name", selectedEmployee.value.last_name);
      formData.append("email", selectedEmployee.value.email);
      if (selectedEmployee.value.company_id !== 0) {
        formData.append("company_id", selectedEmployee.value.company_id);
      }
      formData.append("phone", selectedEmployee.value.phone);

      axios
        .post(`/employees/${selectedEmployee.value.id}?_method=PUT`, formData)
        .then((response) => {
          fetchEmployees();
        })
        .catch((error) => {
          console.error(error);
        });
    }

    showEditModal.value = false;

    console.log(selectedEmployee.value);
  }
};

const removeEmployee = (employeeId) => {
  axios
    .delete(`/employees/${selectedEmployee.value.id}`)
    .then((response) => {
      fetchEmployees();
    })
    .catch((error) => {
      console.log(error);
    });
};

const addEmployee = () => {
  isNewEmployee.value = true;
  selectedEmployee.value = {
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
const phoneRules = [
  (v) => !!v || "Phone number is required",
  (v) => /^\d{10}$/.test(v) || "Phone number must be 10 digits",
];
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Employees">
        <VTable>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee.id">
              <td>{{ employee.first_name }}</td>
              <td>{{ employee.last_name }}</td>
              <td>
                <v-avatar :image="`/storage/${employee.company?.logo}`">
                </v-avatar>
                {{ employee.company?.name }}
              </td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.phone }}</td>
              <td>
                <VBtn color="primary" @click="openEditModal(employee)"
                  >Edit</VBtn
                >
                <VBtn color="error" @click="removeEmployee(employee.id)"
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
            @click="addEmployee()"
          ></v-btn>
        </v-card-actions>
      </VCard>
    </VCol>
  </VRow>

  <v-dialog width="500" v-model="showEditModal">
    <v-card title="Dialog">
      <v-form
        ref="editForm"
        @submit.prevent="saveEditedEmployee"
        v-model="valid"
      >
        <v-card-text>
          <v-text-field
            class="mt-2"
            v-model="selectedEmployee.first_name"
            :rules="nameRules"
            label="First Name"
          ></v-text-field>
          <v-text-field
            class="mt-2"
            v-model="selectedEmployee.last_name"
            :rules="nameRules"
            label="Last Name"
          ></v-text-field>
          <v-select
            class="mt-2"
            v-model="selectedEmployee.company_id"
            item-text="name"
            item-key="id"
            item-title="name"
            item-value="id"
            :items="companies"
            label="Company"
          ></v-select>
          <v-text-field
            class="mt-2"
            v-model="selectedEmployee.email"
            :rules="emailRules"
            label="Email"
          ></v-text-field>
          <v-text-field
            class="mt-2"
            v-model="selectedEmployee.phone"
            :rules="phoneRules"
            label="Phone"
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
  setup() {
    return {
      employees,
      showEditModal,
      selectedEmployee,
      openEditModal,
      saveEditedEmployee,
      removeEmployee,
      addEmployee,
    };
  },
};
</script>
