<template>
	<v-app>
		<div class="pa-10">
			<v-card>
				<v-card-title>
					<p>Dashboard</p>
				</v-card-title>
				<v-card-text>
					<v-row>
						<v-col>
							<p class="text-centerd">Comming Soon</p>
						</v-col>
						<v-col class="text-right">
							<v-btn @click="logout" color="primary">Log out</v-btn>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
			<v-card v-if="0" class="mx-auto my-12">
				<div v-for="value in checkInCheckout">
					<v-card-title>
						<span class="text-h6 font-weight-light">{{ value.val }}</span>
					</v-card-title>

					<v-card-title>
						<v-card-text class="text-h5 font-weight-bold"
							v-if="dash.todayCheckInRemaining > 0 && value.val == 'Check In'">
							{{ dash.todayCheckInRemaining }}
						</v-card-text>
						<v-icon end icon="mdi-checkbox-marked-circle"
							v-if="dash.todayCheckInRemaining <= 0 && value.val == 'Check In'"></v-icon>
						<v-card-text class="text-h5 font-weight-bold"
							v-if="dash.todayCheckOutRemaining > 0 && value.val == 'Check Out'">
							{{ dash.todayCheckOutRemaining }}
						</v-card-text>
						<v-icon end icon="mdi-checkbox-marked-circle"
							v-if="dash.todayCheckOutRemaining <= 0 && value.val == 'Check Out'"></v-icon>
						<v-icon icon="fas fa-plus" />
					</v-card-title>

					<div class="text-center">
						<v-card-actions>
							<v-list-item class="grow">
								<v-list-item-content>
									<v-list-item-title>Remaining : </v-list-item-title>
								</v-list-item-content>

								<v-row>
									<v-col>
										<span class="subheading mr-2" v-if="value.val == 'Check In'">{{
											dash.todayCheckInRemaining
										}}
											/ {{ dash.todayCheckInExpected }}</span>
										<span class="subheading mr-2" v-if="value.val == 'Check Out'">{{
											dash.todayCheckOutRemaining
										}} /
											{{ dash.todayCheckOutExpected }}</span>
									</v-col>
									<v-col>
										<span class="subheading">{{ dash.date }}</span>
									</v-col>
								</v-row>
							</v-list-item>
						</v-card-actions>
					</div>
				</div>
			</v-card>
		</div>
	</v-app>
</template>

<script>
import { aliases, fa } from 'vuetify/iconsets/fa';
import { mdi } from 'vuetify/iconsets/mdi';
import { hotelApi } from "@/service/hotel/httpClient";
import authService from "@/service/hotel/authService";
import globalConstants from '@/metaData/globalConstants';


// import type { PropType } from 'vue'

// interface Book {
// 	checkInList: []
// 	checkOutList: []
// 	date: string
// 	tabs: Array<string>
// 	todayCheckIn: number
// 	todayCheckInExpected: number
// 	todayCheckInRemaining: number
// 	todayCheckOut: number
// 	todayCheckOutExpected: number
// 	todayCheckOutRemaining: number
// }

export default {
	name: "dashboard-page",
	// icons: {
	// 	defaultSet: 'fa',
	// 	aliases,
	// 	sets: {
	// 		fa,
	// 		mdi,
	// 	},
	// },
	components: {

	},
	data() {
		return {
			checkInCheckout:
				[
					{ key: 'checkIn', val: 'Check In' },
					{ key: 'checkOut', val: 'Check Out' }
				],
			dash: {
				checkInList: null,
				checkOutList: null,
				date: null,
				tabs: null,
				todayCheckInExpected: null,
				todayCheckInRemaining: null,
				todayCheckOut: null,
				todayCheckOutExpected: null,
				todayCheckOutRemaining: null,
			},
		}
	},
	mounted() {
		//this.getAllDashboardDetails();

	},
	methods: {
		async getAllDashboardDetails() {
			const url = `${globalConstants.HOTEL_API_URL}/DashboardGraph/getAllDashboardDetails/room`;
			const dashboardDetails = await hotelApi.get(url).catch(() => {
				console.log(err);
			});
			if (dashboardDetails.data) {
				this.dash = dashboardDetails.data;
			}
		},
		logout() {
			authService.logout();
			this.$router.push("/");
		}
	},
	beforeMount() {
		if (!authService.isUserLoggedIn()) {
			this.$router.push("/");
		}
	}

}
</script>

<style></style>
