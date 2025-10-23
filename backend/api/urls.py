from django.urls import path
from .views import MatchesPerYear, MatchesWonAllTeams, ExtraRunsPerTeam, TopEconomicalBowlers, MatchesPlayedWon

urlpatterns = [
    path('matches_per_year/', MatchesPerYear.as_view(), name='matches_per_year'),
    path('matches_won_all_teams/', MatchesWonAllTeams.as_view(), name='matches_won_all_teams'),
    path('extra_runs/<int:year>/', ExtraRunsPerTeam.as_view(), name='extra_runs_per_team'),
    path('top_economical_bowlers/<int:year>/', TopEconomicalBowlers.as_view(), name='top_economical_bowlers'),
    path('matches_played_won/<int:year>/', MatchesPlayedWon.as_view(), name='matches_played_won'),
]
