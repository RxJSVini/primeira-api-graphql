import { Arg , Resolver, Query, Mutation, FieldResolver } from "type-graphql";
import { CreateAppointmentInput } from "../inputs/create-appointment-input";
import { Appointment } from "../models/appointment-models";
import { Customer } from "../models/custommer-model";

@Resolver(() => Appointment)
export class AppointmentsResolver{
    @Query(() => [Appointment])
    async appointments(){
        return []
    }

    @Mutation(() => Appointment)
    async createAppointment(@Arg('data') data:CreateAppointmentInput){
        const appointment = {
            startsAt:data.startsAt,
            endsAt:data.endsAt,
        }
        return appointment;
    }

    @FieldResolver(() => Customer)
    async customer(){
        
    }

}



