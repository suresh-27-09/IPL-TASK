from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count, Sum, F, FloatField
from django.db.models.functions import Cast
from .models import Match, Delivery


class MatchesPerYear(APIView):
    def get(self, request):
        data = Match.objects.values('season').annotate(matches=Count('id')).order_by('season')
        return Response(list(data))

class MatchesWonAllTeams(APIView):
    def get(self, request):
        data = Match.objects.values('season', 'winner').annotate(wins=Count('id')).order_by('season')
        return Response(list(data))


class ExtraRunsPerTeam(APIView):
    def get(self, request, year):
        matches_in_year = Match.objects.filter(season=year).values_list('id', flat=True)
        data = Delivery.objects.filter(match_id__in=matches_in_year).values('bowling_team').annotate(extra_runs=Sum('extra_runs'))
        return Response(list(data))


class TopEconomicalBowlers(APIView):
    def get(self, request, year):
        matches_in_year = Match.objects.filter(season=year).values_list('id', flat=True)
        deliveries = Delivery.objects.filter(match_id__in=matches_in_year)
        bowler_stats = deliveries.values('bowler').annotate(
            total_runs=Sum('total_runs'),
            total_balls=Count('ball')
        )
        for b in bowler_stats:
            b['economy'] = (b['total_runs'] * 6) / b['total_balls']
        sorted_bowlers = sorted(bowler_stats, key=lambda x: x['economy'])
        return Response(sorted_bowlers[:10])


class MatchesPlayedWon(APIView):
    def get(self, request, year):
        matches_in_year = Match.objects.filter(season=year)
        teams = set(list(matches_in_year.values_list('team1', flat=True)) + list(matches_in_year.values_list('team2', flat=True)))
        data = []
        for i in teams:
            played = matches_in_year.filter(team1=i).count() + matches_in_year.filter(team2=i).count()
            won = matches_in_year.filter(winner=i).count()
            data.append({'team': i, 'played': played, 'won': won})
        return Response(data)
