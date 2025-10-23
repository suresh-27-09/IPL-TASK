import pandas as pd
from django.core.management.base import BaseCommand
from api.models import Match, Delivery
import os

class Command(BaseCommand):
    help = 'Load IPL CSV data into DB'

    def handle(self, *args, **kwargs):
        try:
            # Get backend folder path (where this file and CSVs are)
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # backend folder

            matches_file = os.path.join(base_dir, 'matches.csv')
            deliveries_file = os.path.join(base_dir, 'deliveries.csv')

            # -------------------- Load Matches --------------------
            matches_df = pd.read_csv(matches_file)
            print(f"Total matches rows: {len(matches_df)}")

            for i, row in matches_df.iterrows():
                try:
                    Match.objects.update_or_create(
                        id=row['id'],
                        defaults={
                            'season': row['season'],
                            'city': row['city'],
                            'date': row['date'],
                            'team1': row['team1'],
                            'team2': row['team2'],
                            'toss_winner': row['toss_winner'],
                            'toss_decision': row['toss_decision'],
                            'result': row['result'],
                            'dl_applied': row['dl_applied'],
                            'winner': row['winner'] if pd.notna(row['winner']) else None,
                            'win_by_runs': row['win_by_runs'],
                            'win_by_wickets': row['win_by_wickets'],
                            'player_of_match': row['player_of_match'] if pd.notna(row['player_of_match']) else None,
                            'venue': row['venue'],
                            'umpire1': row['umpire1'] if pd.notna(row['umpire1']) else None,
                            'umpire2': row['umpire2'] if pd.notna(row['umpire2']) else None,
                            'umpire3': row['umpire3'] if pd.notna(row['umpire3']) else None,
                        }
                    )
                except Exception as e:
                    print(f"Error in match row {i}: {e}")

            self.stdout.write(self.style.SUCCESS('Matches loaded successfully'))

            # -------------------- Load Deliveries --------------------
            deliveries_df = pd.read_csv(deliveries_file)
            print(f"Total deliveries rows: {len(deliveries_df)}")

            for i, row in deliveries_df.iterrows():
                try:
                    Delivery.objects.update_or_create(
                        match_id=row['match_id'],
                        inning=row['inning'],
                        batting_team=row['batting_team'],
                        bowling_team=row['bowling_team'],
                        over=row['over'],
                        ball=row['ball'],
                        batsman=row['batsman'],
                        non_striker=row['non_striker'],
                        bowler=row['bowler'],
                        is_super_over=row['is_super_over'],
                        wide_runs=row['wide_runs'],
                        bye_runs=row['bye_runs'],
                        legbye_runs=row['legbye_runs'],
                        noball_runs=row['noball_runs'],
                        penalty_runs=row['penalty_runs'],
                        batsman_runs=row['batsman_runs'],
                        extra_runs=row['extra_runs'],
                        total_runs=row['total_runs'],
                        player_dismissed=row['player_dismissed'] if pd.notna(row['player_dismissed']) else None,
                        dismissal_kind=row['dismissal_kind'] if pd.notna(row['dismissal_kind']) else None,
                        fielder=row['fielder'] if pd.notna(row['fielder']) else None,
                    )
                except Exception as e:
                    print(f"Error in delivery row {i}: {e}")

                if i % 1000 == 0 and i != 0:
                    print(f"Processed {i} deliveries...")

            self.stdout.write(self.style.SUCCESS('Deliveries loaded successfully'))

        except FileNotFoundError as e:
            self.stdout.write(self.style.ERROR(f'File not found: {e.filename}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {str(e)}'))
